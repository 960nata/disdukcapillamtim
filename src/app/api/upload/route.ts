import { NextResponse } from 'next/server';
import { writeFile, mkdir, stat } from 'fs/promises';
export const dynamic = "force-dynamic";
import { join } from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    console.log('Upload API - file:', file);
    console.log('Upload API - file name:', (file as any)?.name);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = (file as any).name || 'upload.jpg';
    const extension = fileName.split('.').pop()?.toLowerCase();

    // Gunakan folder public_html di server jika ada, jika tidak pakai folder project
    let uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await stat('/home/seputa55/public_html');
      uploadDir = '/home/seputa55/public_html/uploads';
    } catch (e) {
      // Folder tidak ada (berarti di local), pakai default
    }
    
    // Pastikan folder uploads ada
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Folder already exists or error
    }

    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    let finalUrl = '';

    if (extension === 'webp') {
      // Save directly for webp
      const finalPath = join(uploadDir, `${uniqueName}.webp`);
      await writeFile(finalPath, buffer);
      finalUrl = `/api/uploads?file=${uniqueName}.webp`;
      console.log('Upload API - Saved webp to:', finalPath);
    } else {
      // Compress to AVIF for others using sharp
      const finalPath = join(uploadDir, `${uniqueName}.avif`);
      await sharp(buffer)
        .avif({ quality: 80 })
        .toFile(finalPath);
      finalUrl = `/api/uploads?file=${uniqueName}.avif`;
      console.log('Upload API - Saved avif to:', finalPath);
    }

    console.log('Upload API - Returning URL:', finalUrl);
    return NextResponse.json({ url: finalUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
