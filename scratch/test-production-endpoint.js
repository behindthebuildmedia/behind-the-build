

async function testEndpoint() {
  const url = 'https://behindthebuild-fawn.vercel.app/api/bookings';
  console.log(`Sending test booking POST request to ${url}...`);
  
  const payload = {
    client_name: 'Nikhil Test',
    email: 'nikhilmorampudi29@gmail.com',
    phone: '9876543210',
    company_name: 'Test Co',
    project_location: 'Remote',
    services: [
      { service: 'Video Editing', plan: 'Starter', price: '₹6,000 / Month' }
    ],
    project_details: 'This is a production verification test request. Please ignore.'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    console.log(`Response Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log(`Response Body:`, text);
  } catch (err) {
    console.error(`Fetch error:`, err);
  }
}

testEndpoint();
