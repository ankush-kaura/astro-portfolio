require('dotenv').config();
const { createClient } = require('contentful-management');

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

async function createSampleCV ()
{
  try
  {
    console.log('📄 Creating sample CV entry...\n');

    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');

    // First, let's check if we need to upload the existing CV file as an asset
    console.log('📋 Please upload your CV file manually in Contentful:');
    console.log('1. Go to Media section in Contentful dashboard');
    console.log('2. Upload your CV English.pdf file');
    console.log('3. Copy the asset ID and URL');
    console.log('4. Then run this script again');

    console.log('\n📝 Manual CV Entry Creation:');
    console.log('Content Type: CV/Resume (78VSYVN5JR9O5zqLkzVfvM)');
    console.log('Fields:');
    console.log('- Title: "My Resume"');
    console.log('- Description: "View and download my latest resume"');
    console.log('- Resume PDF: [Upload your CV file and select it]');
    console.log('- File Name: "Ankush_Kaura_Resume.pdf"');

    console.log('\n✅ CV Model is ready for content!');
    console.log('🌐 Test your portfolio at: http://localhost:4321');

  } catch (error)
  {
    console.error('❌ Error:', error.message);
  }
}

createSampleCV();