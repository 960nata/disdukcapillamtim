import { NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const resolvedParams = await params;
    const filename = resolvedParams.filename;

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Tentukan folder uploads
    let uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await stat('/home/seputa55/public_html');
      uploadDir = '/home/seputa55/public_html/uploads';
    } catch (e) {
      // Folder tidak ada (berarti di local), pakai default
    }

    const filePath = join(uploadDir, filename);

    try {
      const fileBuffer = await readFile(filePath);
      
      // Deteksi Content-Type berdasarkan ekstensi
      const ext = filename.split('.').pop()?.toLowerCase();
      let contentType = 'application/octet-stream';
      
      if (ext === 'webp') contentType = 'image/webp';
      else if (ext === 'avif') contentType = 'image/avif';
      else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
      else if (ext === 'png') contentType = 'image/png';
      else if (ext === 'gif') contentType = 'image/gif';
      
      // Kembalikan file dengan header yang benar
      return new Response(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (e) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
