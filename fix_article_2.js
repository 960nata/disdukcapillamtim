const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const slug = "inovasi-si-lamtim-makmur-capai-user-terdaftar-500-ribu-jiwa"; // Keep old slug to avoid broken links if any, but update title
    
    const exists = await prisma.news.findUnique({ where: { slug: slug } });
    if (!exists) {
      console.log('Article 2 not found with slug:', slug);
      return;
    }

    const newTitle = "Inovasi 'Si Lamtim Berjaya' Capai 10 Ribu+ Unduhan";
    
    // Replace text in content
    let content = exists.content;
    content = content.replace(/Si Lamtim Makmur/g, "Si Lamtim Berjaya");
    content = content.replace(/500 Ribu Jiwa/g, "10 Ribu+ Unduhan");
    content = content.replace(/500\.000 jiwa/g, "10.000+ pengguna");
    content = content.replace(/setengah juta/g, "sepuluh ribu lebih");
    content = content.replace(/500 ribu/g, "10 ribu+");
    content = content.replace(/500\.000/g, "10.000+");

    const updated = await prisma.news.update({
      where: { slug: slug },
      data: {
        title: newTitle,
        content: content,
        seoTitle: "Si Lamtim Berjaya Tembus 10 Ribu Unduhan | Lampung Timur",
        seoDesc: "Aplikasi pelayanan publik digital 'Si Lamtim Berjaya' berhasil menembus angka 10.000+ unduhan di Kabupaten Lampung Timur.",
      }
    });

    console.log('Updated successfully:', updated.title);
  } catch (error) {
    console.error('Update error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
