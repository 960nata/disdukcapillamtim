import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Seed Settings
    await prisma.setting.upsert({
      where: { key: 'stats_title' },
      update: { value: 'Data Semester II 2025' },
      create: { key: 'stats_title', value: 'Data Semester II 2025' },
    });

    // Seed Statistics
    const initialStats = [
      { label: 'Total Penduduk', value: '1.132.341', unit: 'jiwa', growth: '+0.8%', order: 0 },
      { label: 'Penduduk Laki-laki', value: '575.383', unit: 'jiwa', growth: null, order: 1 },
      { label: 'Penduduk Perempuan', value: '556.958', unit: 'jiwa', growth: null, order: 2 },
      { label: 'Jumlah KK', value: '556.958', unit: 'KK', growth: '+1.1%', order: 3 },
    ];

    for (const stat of initialStats) {
      await prisma.statistic.upsert({
        where: { id: initialStats.indexOf(stat) + 1 }, // Using fixed IDs for seeding
        update: stat,
        create: stat,
      });
    }

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
