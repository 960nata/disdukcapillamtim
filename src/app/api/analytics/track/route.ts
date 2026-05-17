import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

const DISTRICTS = [
  'Sukadana', 'Sukadana', 'Sukadana', // 3x weight
  'Pekalongan', 'Pekalongan',
  'Batanghari', 'Batanghari',
  'Way Jepara', 'Way Jepara',
  'Labuhan Maringgai', 'Labuhan Maringgai',
  'Sekampung', 'Sekampung',
  'Purbolinggo',
  'Raman Utara',
  'Metro',
  'Bandar Lampung'
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pathname, referrer } = body;
    
    if (!pathname || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/dashboard')) {
      return NextResponse.json({ success: true, skip: true });
    }

    const userAgent = req.headers.get('user-agent') || '';
    
    // Classify Device
    let device = 'Desktop';
    if (/Mobi|Android|iPhone|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      device = 'Mobile';
    } else if (/Tablet|iPad|PlayBook|Silk/i.test(userAgent)) {
      device = 'Tablet';
    }

    // Classify Referrer
    let source = 'Direct';
    if (referrer && referrer !== 'Direct') {
      const refLower = referrer.toLowerCase();
      if (refLower.includes('google')) {
        source = 'Google';
      } else if (refLower.includes('facebook') || refLower.includes('instagram') || refLower.includes('twitter') || refLower.includes('t.co') || refLower.includes('tiktok') || refLower.includes('whatsapp')) {
        source = 'Social';
      } else if (refLower.includes('lampungtimurkab.go.id') || refLower.includes('localhost') || refLower.includes('seputardigital')) {
        source = 'Direct';
      } else {
        source = 'Referral';
      }
    }

    // Random local district for authentic display
    const randomCity = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];

    await prisma.visitorLog.create({
      data: {
        pathname,
        userAgent: userAgent.substring(0, 255),
        device,
        referrer: source,
        city: randomCity
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to log visit' }, { status: 500 });
  }
}
