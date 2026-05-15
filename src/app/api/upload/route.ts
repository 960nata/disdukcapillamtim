import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = (file as any).name || 'upload.jpg';
    const extension = fileName.split('.').pop()?.toLowerCase();

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
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
      finalUrl = `/uploads/${uniqueName}.webp`;
    } else {
      // Compress to AVIF for others using sharp
      const finalPath = join(uploadDir, `${uniqueName}.avif`);
      await sharp(buffer)
        .avif({ quality: 80 })
        .toFile(finalPath);
      finalUrl = `/uploads/${uniqueName}.avif`;
    }

    return NextResponse.json({ url: finalUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
