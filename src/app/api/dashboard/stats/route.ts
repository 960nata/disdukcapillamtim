import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [totalNews, totalUsers, totalInnovations, totalGallery] = await Promise.all([
      prisma.news.count(),
      prisma.user.count(),
      prisma.innovation.count(),
      prisma.gallery.count(),
    ]);

    return NextResponse.json({
      totalNews,
      totalUsers,
      totalInnovations,
      totalGallery,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
