import { NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
export const dynamic = "force-dynamic";
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Tentukan folder uploads (sama seperti di upload API)
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
      const extension = filename.split('.').pop()?.toLowerCase();
      const contentType = extension === 'webp' ? 'image/webp' : 'image/avif';
      
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
