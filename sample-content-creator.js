require('dotenv').config();
const { createClient } = require('contentful-management');
const fs = require('fs');

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

function getMimeType (filePath)
{
  const ext = filePath.split('.').pop().toLowerCase();
  const mimeTypes = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml'
  };
  return mimeTypes[ ext ] || 'image/png';
}

async function uploadAsset (environment, filePath, title)
{
  try
  {
    if (!fs.existsSync(filePath))
    {
      console.error(`File not found: ${ filePath }`);
      return null;
    }
    const contentType = getMimeType(filePath);
    const asset = await environment.createAsset({
      fields: {
        title: { 'en-US': title },
        file: { 'en-US': { upload: fs.readFileSync(filePath), contentType: contentType, fileName: filePath.split('/').pop() } }
      }
    });

    await asset.update();
    await asset.processForAllLocales();
    await asset.publish();
    return asset;
  } catch (error)
  {
    console.error('Error uploading asset:', error.message);
    return null;
  }
}

async function createSampleContent ()
{
  try
  {
    console.log('🚀 Creating sample content entries...\n');

    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');

    // Check existing entries to avoid duplicates
    const existingAbout = await environment.getEntries({ content_type: '4daCkAlNhY01nQJfQYZ7nK' });
    if (existingAbout.items.length > 0)
    {
      console.log('⚠️  About Me entry already exists, skipping');
    } else
    {
      // Sample About Me entry
      const aboutEntry = await environment.createEntry('4daCkAlNhY01nQJfQYZ7nK', {
        fields: {
          intro: {
            'en-US': 'Experienced Full Stack Developer with over 7 years of hands-on expertise designing and deploying scalable, data-driven solutions for healthcare, e-commerce, government, and fintech sectors. Passionate about leveraging backend architecture, cloud computing, and modern frameworks to deliver intelligent, AI-powered applications.'
          },
          tools: {
            'en-US': [
              'JavaScript',
              'PHP',
              'TypeScript',
              'Node.js',
              'React.js',
              'Angular',
              'Vue.js',
              'Express.js',
              'MySQL',
              'PostgreSQL',
              'MongoDB',
              'AWS',
              'Firebase',
              'Tailwind CSS',
              'Material UI',
              'Socket.io',
              'Redux',
              'GraphQL'
            ]
          },
          introBottom: {
            'en-US': 'Seeking opportunities to contribute technical leadership and innovative problem-solving skills in dynamic engineering environments.'
          }
        }
      });

      await aboutEntry.publish();
      console.log('✅ About Me entry created');
    }

    // Check existing Contact entries
    const existingContact = await environment.getEntries({ content_type: '3wPX3nyvcvpLirGdlmQqav' });
    if (existingContact.items.length > 0)
    {
      console.log('⚠️  Contact entry already exists, skipping');
    } else
    {
      // Sample Contact entry
      const contactEntry = await environment.createEntry('3wPX3nyvcvpLirGdlmQqav', {
        fields: {
          email: {
            'en-US': 'amkauras@gmail.com'
          },
          github: {
            'en-US': 'https://github.com/ankush-kaura'
          },
          linkedin: {
            'en-US': 'https://www.linkedin.com/in/ankush-kaura/'
          }
        }
      });

      await contactEntry.publish();
      console.log('✅ Contact entry created');
    }

    // Check and create Experience entries individually to avoid duplicates
    const existingExp1 = await environment.getEntries({ content_type: '3X8gmc3px60PrqMJi7kADy', 'fields.company': 'Master Software Solutions' });
    if (existingExp1.items.length === 0)
    {
      const experience1 = await environment.createEntry('3X8gmc3px60PrqMJi7kADy', {
        fields: {
          company: { 'en-US': 'Master Software Solutions' },
          position: { 'en-US': 'Node.js Developer' },
          location: { 'en-US': 'Mohali, India' },
          start: { 'en-US': '2019' },
          end: { 'en-US': 'Current' },
          tasks: {
            'en-US': [
              'Designed, implemented, and maintained backend services using Node.js and Express.js for real-time healthcare applications',
              'Integrated AWS API Gateway and MySQL for secure, scalable data management across distributed platforms',
              'Collaborated with product teams to streamline application performance and enhance user experience'
            ]
          }
        }
      });

      await experience1.publish();
      console.log('✅ Experience 1 entry created');
    } else
    {
      console.log('⚠️  Experience 1 (Master Software Solutions) already exists, skipping');
    }

    const existingExp2 = await environment.getEntries({ content_type: '3X8gmc3px60PrqMJi7kADy', 'fields.company': 'Inext Solutions' });
    if (existingExp2.items.length === 0)
    {
      const experience2 = await environment.createEntry('3X8gmc3px60PrqMJi7kADy', {
        fields: {
          company: { 'en-US': 'Inext Solutions' },
          position: { 'en-US': 'Jr. PHP Developer' },
          location: { 'en-US': 'Chandigarh, India' },
          start: { 'en-US': '2018' },
          end: { 'en-US': '2019' },
          tasks: {
            'en-US': [
              'Developed robust backend modules using PHP to support e-commerce applications and government portals',
              'Optimized MySQL queries to improve application speed and reliability'
            ]
          }
        }
      });

      await experience2.publish();
      console.log('✅ Experience 2 entry created');
    } else
    {
      console.log('⚠️  Experience 2 (Inext Solutions) already exists, skipping');
    }

    const existingExp3 = await environment.getEntries({ content_type: '3X8gmc3px60PrqMJi7kADy', 'fields.company': 'Parse Techno Measure' });
    if (existingExp3.items.length === 0)
    {
      const experience3 = await environment.createEntry('3X8gmc3px60PrqMJi7kADy', {
        fields: {
          company: { 'en-US': 'Parse Techno Measure' },
          position: { 'en-US': 'Intern Python and JavaScript' },
          location: { 'en-US': 'Ambala, India' },
          start: { 'en-US': '2016' },
          end: { 'en-US': '2017' },
          tasks: {
            'en-US': [
              'Supported software development initiatives using Python and JavaScript for custom analytics tools',
              'Assisted in code reviews and bug resolution throughout the project lifecycle'
            ]
          }
        }
      });

      await experience3.publish();
      console.log('✅ Experience 3 entry created');
    } else
    {
      console.log('⚠️  Experience 3 (Parse Techno Measure) already exists, skipping');
    }

    const existingExp4 = await environment.getEntries({ content_type: '3X8gmc3px60PrqMJi7kADy', 'fields.company': 'Acxiom Consulting Pvt. Ltd' });
    if (existingExp4.items.length === 0)
    {
      const experience4 = await environment.createEntry('3X8gmc3px60PrqMJi7kADy', {
        fields: {
          company: { 'en-US': 'Acxiom Consulting Pvt. Ltd' },
          position: { 'en-US': 'MS Dynamics, Jr. Technical Consultant' },
          location: { 'en-US': 'Noida, India' },
          start: { 'en-US': '2015' },
          end: { 'en-US': '2015' },
          tasks: {
            'en-US': [
              'Assisted in MS Dynamics setup and configuration for key business accounts',
              'Provided technical support during migration and implementation phases'
            ]
          }
        }
      });

      await experience4.publish();
      console.log('✅ Experience 4 entry created');
    } else
    {
      console.log('⚠️  Experience 4 (Acxiom Consulting Pvt. Ltd) already exists, skipping');
    }

    // Check and create Study entries individually to avoid duplicates
    const existingStudy1 = await environment.getEntries({ content_type: '2bKLoIiREd582YgswI85Ki', 'fields.title': 'Bachelor of Technology (Electronics & Communication Engineering)' });
    if (existingStudy1.items.length === 0)
    {
      const study1 = await environment.createEntry('2bKLoIiREd582YgswI85Ki', {
        fields: {
          title: { 'en-US': 'Bachelor of Technology (Electronics & Communication Engineering)' },
          institution: { 'en-US': 'Regional Institute for Management and Technology' },
          link: { 'en-US': 'https://www.rimt.ac.in/' },
          date: { 'en-US': '2012 - 2015' }
        }
      });

      await study1.publish();
      console.log('✅ Study 1 entry created');
    } else
    {
      console.log('⚠️  Study 1 (Bachelor of Technology) already exists, skipping');
    }

    const existingStudy2 = await environment.getEntries({ content_type: '2bKLoIiREd582YgswI85Ki', 'fields.title': 'Diploma in Electronics & Communication Engineering' });
    if (existingStudy2.items.length === 0)
    {
      const study2 = await environment.createEntry('2bKLoIiREd582YgswI85Ki', {
        fields: {
          title: { 'en-US': 'Diploma in Electronics & Communication Engineering' },
          institution: { 'en-US': 'Regional Institute for Management and Technology' },
          link: { 'en-US': 'https://www.rimt.ac.in/' },
          date: { 'en-US': '2009 - 2012' }
        }
      });

      await study2.publish();
      console.log('✅ Study 2 entry created');
    } else
    {
      console.log('⚠️  Study 2 (Diploma) already exists, skipping');
    }

    const existingStudy3 = await environment.getEntries({ content_type: '2bKLoIiREd582YgswI85Ki', 'fields.title': 'Matriculation (Punjab School Education Board)' });
    if (existingStudy3.items.length === 0)
    {
      const study3 = await environment.createEntry('2bKLoIiREd582YgswI85Ki', {
        fields: {
          title: { 'en-US': 'Matriculation (Punjab School Education Board)' },
          institution: { 'en-US': 'HSPC Ludhiana' },
          date: { 'en-US': '2009' }
        }
      });

      await study3.publish();
      console.log('✅ Study 3 entry created');
    } else
    {
      console.log('⚠️  Study 3 (Matriculation) already exists, skipping');
    }

    // Check and create Project entries individually to avoid duplicates
    const existingProj1 = await environment.getEntries({ content_type: '2lKIjWiLF8dc9Jf62IFBgm', 'fields.title': 'Illuminate Health' });
    if (existingProj1.items.length === 0)
    {
      const project1 = await environment.createEntry('2lKIjWiLF8dc9Jf62IFBgm', {
        fields: {
          title: { 'en-US': 'Illuminate Health' },
          description: {
            'en-US': 'Developed a pharmacist-led virtual medication management platform for streamlined patient-doctor interactions and medication compliance monitoring. Integrated vitals recording and medication alerts to enable real-time health assessment and prescription adjustments.'
          },
          technologies: {
            'en-US': [ 'Node.js', 'Express.js', 'MySQL', 'Angular 8', 'Rocket.Chat', 'AWS API Gateway' ]
          }
        }
      });

      await project1.publish();
      console.log('✅ Project 1 entry created');
    } else
    {
      console.log('⚠️  Project 1 (Illuminate Health) already exists, skipping');
    }

    const existingProj2 = await environment.getEntries({ content_type: '2lKIjWiLF8dc9Jf62IFBgm', 'fields.title': 'KLIIT' });
    if (existingProj2.items.length === 0)
    {
      const project2 = await environment.createEntry('2lKIjWiLF8dc9Jf62IFBgm', {
        fields: {
          title: { 'en-US': 'KLIIT' },
          description: {
            'en-US': 'Built an online doctor consulting system with direct patient–doctor engagement and seamless admin panel automation. Leveraged Firebase and Firebase Cloud Functions to optimize background data processing and backend scalability.'
          },
          technologies: {
            'en-US': [ 'Node.js', 'Express.js', 'EJS', 'Firestore', 'Firebase' ]
          }
        }
      });

      await project2.publish();
      console.log('✅ Project 2 entry created');
    } else
    {
      console.log('⚠️  Project 2 (KLIIT) already exists, skipping');
    }

    const existingProj3 = await environment.getEntries({ content_type: '2lKIjWiLF8dc9Jf62IFBgm', 'fields.title': 'Ensan Care' });
    if (existingProj3.items.length === 0)
    {
      const project3 = await environment.createEntry('2lKIjWiLF8dc9Jf62IFBgm', {
        fields: {
          title: { 'en-US': 'Ensan Care' },
          description: {
            'en-US': 'Delivered an electronic/mobile healthcare platform enabling home-based access to medical providers and area-based appointment booking. Developed user-friendly interfaces and booking logic to match patients with nearby doctors.'
          },
          technologies: {
            'en-US': [ 'Node.js', 'React.js', 'Semantic UI', 'React Native' ]
          }
        }
      });

      await project3.publish();
      console.log('✅ Project 3 entry created');
    } else
    {
      console.log('⚠️  Project 3 (Ensan Care) already exists, skipping');
    }

    // Check existing Timezone entries
    const existingTimezone = await environment.getEntries({ content_type: '6FXHJ5xjilbcZMddkCMqu3' });
    if (existingTimezone.items.length > 0)
    {
      console.log('⚠️  Timezone entry already exists, skipping');
    } else
    {
      // Sample Timezone entry
      const timezoneEntry = await environment.createEntry('6FXHJ5xjilbcZMddkCMqu3', {
        fields: {
          place: { 'en-US': 'Mohali, India' },
          timezone: { 'en-US': 'Asia/Calcutta' }
        }
      });

      await timezoneEntry.publish();
      console.log('✅ Timezone entry created');
    }

    // Check existing Intro entries
    const existingIntro = await environment.getEntries({ content_type: '5QgfOQ8ByPXQBK1JlMsJIw' });
    if (existingIntro.items.length > 0)
    {
      console.log('⚠️  Intro entry already exists, skipping');
    } else
    {
      // Upload image for Intro
      const introImage = await uploadAsset(environment, 'public/me.png', 'Profile Image');
      if (introImage)
      {
        // Sample Intro entry
        const introEntry = await environment.createEntry('5QgfOQ8ByPXQBK1JlMsJIw', {
          fields: {
            welcome: { 'en-US': 'Welcome' },
            name: { 'en-US': 'Ankush Kaura' },
            title: { 'en-US': 'Full Stack Developer & Digital Solutions Architect' },
            image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: introImage.sys.id } } },
            alt: { 'en-US': 'Profile image of Ankush Kaura' }
          }
        });

        await introEntry.publish();
        console.log('✅ Intro entry created');
      } else
      {
        console.log('⚠️  Failed to upload Intro image, skipping entry');
      }
    }

    // Check existing Site entries
    const existingSite = await environment.getEntries({ content_type: '2qhahjwIjTSw5YY2i08AQf' });
    if (existingSite.items.length > 0)
    {
      console.log('⚠️  Site entry already exists, skipping');
    } else
    {
      // Sample Site entry
      const siteEntry = await environment.createEntry('2qhahjwIjTSw5YY2i08AQf', {
        fields: {
          title: { 'en-US': 'Ankush - Full Stack Developer' },
          description: { 'en-US': 'Experienced Full Stack Developer with over 7 years of hands-on expertise designing and deploying scalable, data-driven solutions for healthcare, e-commerce, government, and fintech sectors.' },
          github: { 'en-US': 'https://github.com/ankush-kaura' },
          linkedin: { 'en-US': 'https://www.linkedin.com/in/ankush-kaura/' },
          mail: { 'en-US': 'mailto:amkauras@gmail.com' }
        }
      });

      await siteEntry.publish();
      console.log('✅ Site entry created');
    }

    // Check existing Stack entries
    const existingStack = await environment.getEntries({ content_type: '38XZfyTTR60ITXkT0TfRFw' });
    if (existingStack.items.length > 0)
    {
      console.log('⚠️  Stack entry already exists, skipping');
    } else
    {
      // Sample Stack entry
      const stackEntry = await environment.createEntry('38XZfyTTR60ITXkT0TfRFw', {
        fields: {
          tools: {
            'en-US': [
              'JavaScript',
              'PHP',
              'TypeScript',
              'Node.js',
              'React.js',
              'Angular',
              'Vue.js',
              'Express.js',
              'MySQL',
              'PostgreSQL',
              'MongoDB',
              'AWS',
              'Firebase',
              'Tailwind CSS',
              'Material UI',
              'Socket.io',
              'Redux',
              'GraphQL',
              'WordPress',
              'Shopify',
              'Strapi',
              'Flutter',
              'Git',
              'Figma',
              'Agile'
            ]
          }
        }
      });

      await stackEntry.publish();
      console.log('✅ Stack entry created');
    }

    // Check existing Now entries
    const existingNow = await environment.getEntries({ content_type: '3hvNlODyvI0oz1odsLPYQ0' });
    if (existingNow.items.length > 0)
    {
      console.log('⚠️  Now entry already exists, skipping');
    } else
    {
      // Sample Now entry
      const nowEntry = await environment.createEntry('3hvNlODyvI0oz1odsLPYQ0', {
        fields: {
          status: { 'en-US': 'Currently working as Node.js Developer at Master Software Solutions' }
        }
      });

      await nowEntry.publish();
      console.log('✅ Now entry created');
    }

    // Check existing Tattoo entries
    const existingTattoo = await environment.getEntries({ content_type: '3ZZZgr8VXRALGgtSB2Od77' });
    if (existingTattoo.items.length > 0)
    {
      console.log('⚠️  Tattoo entry already exists, skipping');
    } else
    {
      // Upload image for Tattoo
      const tattooImage = await uploadAsset(environment, 'public/me_tattoo.png', 'Tattoo Image');
      if (tattooImage)
      {
        // Sample Tattoo entry
        const tattooEntry = await environment.createEntry('3ZZZgr8VXRALGgtSB2Od77', {
          fields: {
            text: { 'en-US': "If you want to see my tattoo's, you can follow me on Instagram." },
            image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: tattooImage.sys.id } } },
            alt: { 'en-US': 'Tattoo image' }
          }
        });

        await tattooEntry.publish();
        console.log('✅ Tattoo entry created');
      } else
      {
        console.log('⚠️  Failed to upload Tattoo image, skipping entry');
      }
    }

    // Check existing Quote entries
    const existingQuote = await environment.getEntries({ content_type: 'SOMGXDcaHTVOSmfHiHN3u' });
    if (existingQuote.items.length > 0)
    {
      console.log('⚠️  Quote entry already exists, skipping');
    } else
    {
      // Sample Quote entry
      const quoteEntry = await environment.createEntry('SOMGXDcaHTVOSmfHiHN3u', {
        fields: {
          quote: { 'en-US': 'The only way to do great work is to love what you do' },
          author: { 'en-US': 'Steve Jobs' }
        }
      });

      await quoteEntry.publish();
      console.log('✅ Quote entry created');
    }

    // Check existing Page entries
    const existingPages = await environment.getEntries({ content_type: '3pVhC7wM9WZ3z17KtUYuIZ' });
    const existingSlugs = existingPages.items.map(p => p.fields.slug[ 'en-US' ]);

    if (!existingSlugs.includes('work'))
    {
      const workPageEntry = await environment.createEntry('3pVhC7wM9WZ3z17KtUYuIZ', {
        fields: {
          slug: { 'en-US': 'work' },
          title: { 'en-US': 'Work' },
          description: { 'en-US': 'Places I have worked.' }
        }
      });

      await workPageEntry.publish();
      console.log('✅ Work page entry created');
    } else
    {
      console.log('⚠️  Work page entry already exists, skipping');
    }

    if (!existingSlugs.includes('portfolio'))
    {
      const portfolioPageEntry = await environment.createEntry('3pVhC7wM9WZ3z17KtUYuIZ', {
        fields: {
          slug: { 'en-US': 'portfolio' },
          title: { 'en-US': 'Portfolio' },
          description: { 'en-US': 'Projects' }
        }
      });

      await portfolioPageEntry.publish();
      console.log('✅ Portfolio page entry created');
    } else
    {
      console.log('⚠️  Portfolio page entry already exists, skipping');
    }

    if (!existingSlugs.includes('blogs'))
    {
      const blogsPageEntry = await environment.createEntry('3pVhC7wM9WZ3z17KtUYuIZ', {
        fields: {
          slug: { 'en-US': 'blogs' },
          title: { 'en-US': 'Blogs' },
          description: { 'en-US': 'My blog posts' }
        }
      });

      await blogsPageEntry.publish();
      console.log('✅ Blogs page entry created');
    } else
    {
      console.log('⚠️  Blogs page entry already exists, skipping');
    }

    // Check existing Blog entries
    const existingBlogs = await environment.getEntries({ content_type: '4iLx5UCNPIE6SrGNHluzUR' });
    const existingBlogSlugs = existingBlogs.items.map(b => b.fields.slug[ 'en-US' ]);

    if (!existingBlogSlugs.includes('building-scalable-healthcare-applications-with-nodejs'))
    {
      const blog1 = await environment.createEntry('4iLx5UCNPIE6SrGNHluzUR', {
        fields: {
          title: { 'en-US': 'Building Scalable Healthcare Applications with Node.js' },
          slug: { 'en-US': 'building-scalable-healthcare-applications-with-nodejs' },
          description: { 'en-US': 'Learn how to build robust, scalable healthcare applications using Node.js, Express.js, and modern web technologies.' },
          content: {
            'en-US': {
              nodeType: 'document',
              data: {},
              content: [
                {
                  nodeType: 'paragraph',
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Healthcare applications require high reliability, security, and scalability. In this post, we\'ll explore how to build such applications using Node.js and Express.js, covering best practices for backend development, database integration, and API design.',
                      marks: [],
                      data: {}
                    }
                  ]
                }
              ]
            }
          },
          date: { 'en-US': '2024-01-15' }
        }
      });

      await blog1.publish();
      console.log('✅ Blog 1 entry created');
    } else
    {
      console.log('⚠️  Blog 1 entry already exists, skipping');
    }

    if (!existingBlogSlugs.includes('integrating-aws-services-in-fullstack-applications'))
    {
      const blog2 = await environment.createEntry('4iLx5UCNPIE6SrGNHluzUR', {
        fields: {
          title: { 'en-US': 'Integrating AWS Services in Full-Stack Applications' },
          slug: { 'en-US': 'integrating-aws-services-in-fullstack-applications' },
          description: { 'en-US': 'Learn how to integrate AWS services like API Gateway, Lambda, and Cognito in your full-stack applications for scalable and secure solutions.' },
          content: {
            'en-US': {
              nodeType: 'document',
              data: {},
              content: [
                {
                  nodeType: 'paragraph',
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'AWS provides a comprehensive suite of services for building scalable applications. In this post, we\'ll explore how to integrate AWS API Gateway, Lambda, and Cognito in your full-stack applications to create secure, scalable, and cost-effective solutions.',
                      marks: [],
                      data: {}
                    }
                  ]
                }
              ]
            }
          },
          date: { 'en-US': '2024-01-10' }
        }
      });

      await blog2.publish();
      console.log('✅ Blog 2 entry created');
    } else
    {
      console.log('⚠️  Blog 2 entry already exists, skipping');
    }

    // All entries are already published when created

    console.log('\n🎉 Sample content created and published successfully!');
    console.log('\n📋 Summary of created entries:');
    console.log('✅ About Me entry');
    console.log('✅ Contact Information entry');
    console.log('✅ 4 Experience entries');
    console.log('✅ 3 Study entries');
    console.log('✅ 3 Project entries');
    console.log('✅ Timezone entry');
    console.log('✅ Intro entry');
    console.log('✅ Site Information entry');
    console.log('✅ Tech Stack entry');
    console.log('✅ Current Status entry');
    console.log('✅ Tattoo Information entry');
    console.log('✅ Quote entry');
    console.log('✅ 3 Page entries');
    console.log('✅ 2 Blog entries');

    console.log('\n🔗 Your portfolio should now display dynamic content!');
    console.log('🌐 Test it at: http://localhost:4322');

  } catch (error)
  {
    console.error('❌ Error creating sample content:', error.message);
    console.error('Make sure your management token has write permissions for entries');
  }
}

// Run the sample content creation
createSampleContent();