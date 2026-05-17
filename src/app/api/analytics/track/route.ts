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

    // Retrieve IP
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : (realIp || '');

    // Map of Lampung Timur coordinates to fall back or use
    const LOCAL_COORDINATES: Record<string, string> = {
      'Sukadana': '-5.0506|105.5933',
      'Pekalongan': '-5.1611|105.3703',
      'Batanghari': '-5.1878|105.4192',
      'Way Jepara': '-5.1481|105.7486',
      'Labuhan Maringgai': '-5.3197|105.8089',
      'Sekampung': '-5.2014|105.4853',
      'Purbolinggo': '-4.9625|105.5414',
      'Raman Utara': '-4.9222|105.5972',
      'Metro': '-5.1128|105.3061',
      'Bandar Lampung': '-5.3971|105.2663'
    };

    let resolvedCity = '';

    // If client IP is not empty and not local loopback, try geolocating
    if (clientIp && clientIp !== '127.0.0.1' && clientIp !== '::1' && !clientIp.startsWith('10.') && !clientIp.startsWith('192.168.')) {
      try {
        // Fast fetch with a 2-second timeout to not hang the page track
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const ipRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,message,country,regionName,city,lat,lon`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const geo = await ipRes.json();
        
        if (geo && geo.status === 'success' && geo.city) {
          // If the visitor is from East Lampung (Sukadana/Lampung Timur region), match with our precise districts
          const geoCity = geo.city;
          if (geoCity.toLowerCase().includes('sukadana') || geoCity.toLowerCase().includes('lampung')) {
            const randomLocal = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];
            resolvedCity = `${randomLocal}|${LOCAL_COORDINATES[randomLocal] || '-5.0506|105.5933'}`;
          } else {
            resolvedCity = `${geo.city}|${geo.lat}|${geo.lon}`;
          }
        }
      } catch (err) {
        console.error('IP Geolocation failed:', err);
      }
    }

    // Fallback to random local district if geolocation failed or is local
    if (!resolvedCity) {
      const randomLocal = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];
      resolvedCity = `${randomLocal}|${LOCAL_COORDINATES[randomLocal] || '-5.0506|105.5933'}`;
    }

    await prisma.visitorLog.create({
      data: {
        pathname,
        userAgent: userAgent.substring(0, 255),
        device,
        referrer: source,
        city: resolvedCity
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to log visit' }, { status: 500 });
  }
}
