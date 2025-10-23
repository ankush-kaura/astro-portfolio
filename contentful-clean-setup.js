require('dotenv').config();
const { createClient } = require('contentful-management');

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

async function deleteAllContentTypes ()
{
  try
  {
    console.log('🗑️  Starting cleanup process...\n');

    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');
    const contentTypes = await environment.getContentTypes();

    // Filter out system content types that shouldn't be deleted
    const deletableTypes = contentTypes.items.filter(ct =>
      ![ 'now', 'resume', 'about', 'welcome', 'projects' ].includes(ct.sys.id)
    );

    if (deletableTypes.length === 0)
    {
      console.log('✅ No content types to delete');
      return;
    }

    console.log(`Found ${ deletableTypes.length } content types to delete:`);
    deletableTypes.forEach(ct =>
    {
      console.log(`- ${ ct.sys.id }: ${ ct.name }`);
    });

    // Note: Deletion might require unpublishing first and might not be allowed
    // Let's try a safer approach - just log what would be deleted
    console.log('\n⚠️  WARNING: Automatic deletion may not be permitted by your token');
    console.log('📋 Please manually delete these duplicates in Contentful dashboard:');
    deletableTypes.forEach(ct =>
    {
      console.log(`   - Delete: ${ ct.name } (${ ct.sys.id })`);
    });

    return true;
  } catch (error)
  {
    console.error('❌ Error during cleanup:', error.message);
    return false;
  }
}

async function createFreshContentModels ()
{
  try
  {
    console.log('\n🏗️  Creating fresh content models...\n');

    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');

    // Define clean content models
    const contentModels = [
      {
        id: 'about',
        name: 'About Me',
        fields: [
          {
            id: 'intro',
            name: 'Introduction',
            type: 'Text',
            required: true
          },
          {
            id: 'tools',
            name: 'Tools',
            type: 'Array',
            items: { type: 'Symbol' },
            required: true
          },
          {
            id: 'introBottom',
            name: 'Bottom Introduction',
            type: 'Text',
            required: false
          }
        ]
      },
      {
        id: 'experience',
        name: 'Work Experience',
        fields: [
          {
            id: 'company',
            name: 'Company',
            type: 'Symbol',
            required: true
          },
          {
            id: 'position',
            name: 'Position',
            type: 'Symbol',
            required: true
          },
          {
            id: 'location',
            name: 'Location',
            type: 'Symbol',
            required: false
          },
          {
            id: 'start',
            name: 'Start Date',
            type: 'Symbol',
            required: true
          },
          {
            id: 'end',
            name: 'End Date',
            type: 'Symbol',
            required: false
          },
          {
            id: 'link',
            name: 'Company Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'tasks',
            name: 'Tasks',
            type: 'Array',
            items: { type: 'Text' },
            required: false
          }
        ]
      },
      {
        id: 'study',
        name: 'Education/Study',
        fields: [
          {
            id: 'title',
            name: 'Study Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'institution',
            name: 'Institution',
            type: 'Symbol',
            required: true
          },
          {
            id: 'link',
            name: 'Institution Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'date',
            name: 'Date Range',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'project',
        name: 'Project',
        fields: [
          {
            id: 'title',
            name: 'Project Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Text',
            required: true
          },
          {
            id: 'image',
            name: 'Project Image',
            type: 'Link',
            linkType: 'Asset',
            required: false
          },
          {
            id: 'link',
            name: 'Project Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'technologies',
            name: 'Technologies',
            type: 'Array',
            items: { type: 'Symbol' },
            required: false
          }
        ]
      },
      {
        id: 'contact',
        name: 'Contact Information',
        fields: [
          {
            id: 'email',
            name: 'Email',
            type: 'Symbol',
            required: true
          },
          {
            id: 'github',
            name: 'GitHub',
            type: 'Symbol',
            required: false
          },
          {
            id: 'linkedin',
            name: 'LinkedIn',
            type: 'Symbol',
            required: false
          }
        ]
      },
      {
        id: 'timezone',
        name: 'Timezone Information',
        fields: [
          {
            id: 'place',
            name: 'Place',
            type: 'Symbol',
            required: true
          },
          {
            id: 'timezone',
            name: 'Timezone',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'cv',
        name: 'CV/Resume',
        fields: [
          {
            id: 'title',
            name: 'CV Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Text',
            required: false
          },
          {
            id: 'resumeFile',
            name: 'Resume PDF',
            type: 'Link',
            linkType: 'Asset',
            required: true
          },
          {
            id: 'fileName',
            name: 'File Name',
            type: 'Symbol',
            required: false
          }
        ]
      }
    ];

    console.log('Creating fresh content models...\n');

    for (const model of contentModels)
    {
      try
      {
        console.log(`Creating: ${ model.id } (${ model.name })`);
        const contentType = await environment.createContentType({
          name: model.name,
          description: `Content model for ${ model.name }`,
          displayField: model.fields[ 0 ]?.id || 'title',
          fields: model.fields
        });

        console.log(`✅ Created: ${ model.id }`);
      } catch (error)
      {
        if (error.message.includes('already exists'))
        {
          console.log(`⚠️  ${ model.id } already exists, skipping`);
        } else
        {
          console.error(`❌ Error creating ${ model.id }:`, error.message);
        }
      }
    }

    console.log('\n🎉 Content models creation completed!');
    return true;
  } catch (error)
  {
    console.error('❌ Error creating content models:', error.message);
    return false;
  }
}

async function runCompleteSetup ()
{
  console.log('🚀 Starting complete Contentful setup...\n');

  // Step 1: Check current state
  console.log('=== STEP 1: Analyzing current state ===');
  await deleteAllContentTypes();

  // Step 2: Create fresh models
  console.log('\n=== STEP 2: Creating fresh content models ===');
  const modelsCreated = await createFreshContentModels();

  if (modelsCreated)
  {
    console.log('\n=== STEP 3: Setup Summary ===');
    console.log('✅ Content models created successfully');
    console.log('\n📋 Next steps:');
    console.log('1. Publish all content models in Contentful dashboard');
    console.log('2. Run: node sample-content-creator.js');
    console.log('3. Test your portfolio at: http://localhost:4322');
  }
}

// Run the complete setup
runCompleteSetup();