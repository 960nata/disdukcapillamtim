import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const featuredSetting = await prisma.setting.findUnique({
      where: { key: 'featured_gallery_ids' },
    });
    const featuredIds = featuredSetting?.value ? JSON.parse(featuredSetting.value) : [];
    
    return NextResponse.json({ gallery, featuredIds });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const photo = await prisma.gallery.create({
      data: {
        url: body.url,
        title: body.title,
        description: body.description,
        caption: body.caption,
      },
    });
    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const { featuredIds } = await request.json();
    // We store featured IDs as a comma-separated string in the Setting table
    await prisma.setting.upsert({
      where: { key: 'featured_gallery_ids' },
      update: { value: JSON.stringify(featuredIds) },
      create: { key: 'featured_gallery_ids', value: JSON.stringify(featuredIds) },
    });
    return NextResponse.json({ message: 'Featured photos updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update featured photos' }, { status: 500 });
  }
}
