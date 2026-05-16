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
    // Note: This URL might only be accessible from the server's network
    const SIAK_API_URL = 'http://siak.disdukcapil-lamtim.com:8080/api/cek_status'; // Example endpoint

    // In a real scenario, we would call the external API:
    /*
    const response = await fetch(SIAK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search_type: type,
        registration_number: nomor,
        nik: nik,
        captcha_code: captcha
      })
    });
    const data = await response.json();
    return NextResponse.json(data);
    */

    // For now, since we can't reach the host during development/deployment, 
    // we return a simulation or a "Connection Failed" message to let the user know 
    // we need the exact endpoint details.
    
    // Simulation logic (delete this once real API details are known)
    if (nomor === 'REG-TEST') {
      return NextResponse.json({
        success: true,
        status: 'Dokumen Selesai / Terbit',
        nama: 'TEST USER',
        layanan: 'KTP Elektronik',
        update: new Date().toLocaleString('id-ID')
      });
    }

    return NextResponse.json({ 
      error: 'Cannot connect to SIAK API',
      message: 'Server web tidak dapat menjangkau host siak.disdukcapil-lamtim.com. Pastikan URL API sudah benar dan dapat diakses dari server produksi.'
    }, { status: 502 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
