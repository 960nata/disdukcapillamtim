import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const lamtimData = {
      'Total Penduduk': [1110393, 1113977, 1121782, 1129547, 1137280, 1145100],
      'Wajib KTP': [828140, 832450, 844210, 851600, 858900, 862400],
      'Jumlah KK': [358912, 362450, 368813, 371200, 374150, 376249],
      'Angka Kelahiran': [14850, 15100, 15420, 15800, 16150, 16500],
    };

    const provinsiData = {
      'Total Penduduk': [9010000, 9080000, 9180000, 9310000, 9420000, 9530000],
      'Wajib KTP': [6750000, 6820000, 6950000, 7120000, 7250000, 7340000],
      'Jumlah KK': [2750000, 2810000, 2920000, 3010000, 3120000, 3210000],
      'Angka Kelahiran': [148000, 151200, 154500, 157000, 161400, 164800],
    };

    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const growthLabels = {
      'Total Penduduk': '+0.8%',
      'Wajib KTP': '+1.5%',
      'Jumlah KK': '+1.1%',
      'Angka Kelahiran': '+2.3%',
    };

    const names = Object.keys(lamtimData);

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const chart = await prisma.chart.upsert({
        where: { name },
        update: {
          growthLabel: growthLabels[name as keyof typeof growthLabels],
          order: i,
        },
        create: {
          name,
          growthLabel: growthLabels[name as keyof typeof growthLabels],
          order: i,
        }
      });

      // Clear old points
      await prisma.chartPoint.deleteMany({ where: { chartId: chart.id } });

      // Create new points
      const points = years.map((year, idx) => ({
        year,
        valueLamtim: lamtimData[name as keyof typeof lamtimData][idx],
        valueProvinsi: provinsiData[name as keyof typeof provinsiData][idx],
        chartId: chart.id,
      }));

      await prisma.chartPoint.createMany({ data: points });
    }

    return NextResponse.json({ message: 'Charts seeded successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to seed charts' }, { status: 500 });
  }
}
