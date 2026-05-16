import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { type, nomor, nik, captcha } = body;

    // 1. Basic Sanitization & Validation
    nomor = String(nomor).trim().substring(0, 50);
    nik = String(nik).trim().substring(0, 16);
    captcha = String(captcha).trim().substring(0, 10);

    // 2. Strict Format Validation
    const nikRegex = /^[0-9]{16}$/;
    if (!nikRegex.test(nik)) {
      return NextResponse.json({ error: 'Format NIK tidak valid. Harus 16 digit angka.' }, { status: 400 });
    }

    if (type === 'registrasi' && nomor.length < 5) {
      return NextResponse.json({ error: 'Nomor registrasi terlalu pendek.' }, { status: 400 });
    }

    if (type === 'kk' && !nikRegex.test(nomor)) {
      return NextResponse.json({ error: 'Format Nomor KK tidak valid. Harus 16 digit angka.' }, { status: 400 });
    }

    // 3. Rate Limiting (Conceptual for now, can be implemented with Redis/etc if needed)
    // To protect against automated scraping of sensitive data.

    // 4. Secure API Call
    const SIAK_API_URL = 'http://siak.disdukcapil-lamtim.com:8080/api/cek_status';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(SIAK_API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          search_type: type,
          registration_number: nomor,
          nik: nik,
          captcha_code: captcha
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json({ 
          error: `API Error (Status: ${response.status})`,
          message: errorData.message || 'Sistem SIAK memberikan respon negatif. Mohon coba beberapa saat lagi.'
        }, { status: response.status });
      }

      const data = await response.json();
      return NextResponse.json(data);

    } catch (err: any) {
      if (err.name === 'AbortError') {
        return NextResponse.json({ 
          error: 'Connection Timeout',
          message: 'Koneksi ke server SIAK terlalu lama. Mohon coba lagi.'
        }, { status: 504 });
      }

      return NextResponse.json({ 
        error: 'Cannot connect to SIAK API',
        message: `Gagal terhubung ke host siak.disdukcapil-lamtim.com:8080. ${err.message}`
      }, { status: 502 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
