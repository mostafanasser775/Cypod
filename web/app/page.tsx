import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; // Import redirect function

import axiosInstance from '@/lib/axiosInstance';
import DevicesTable from '@/components/DevicesTable';

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value; // Retrieve access_token from cookies

  let Devices = [];

  try {
    Devices = await axiosInstance.get("devices", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass Bearer token explicitly
      },
    }).then((res) => res.data);
  } catch (error) {
    console.error("Failed to fetch devices:", error);
    redirect('/login'); // Redirect to login page on failure
  }

  return (
    <div>
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <DevicesTable Devices={Devices} />
      </div>
    </div>
  );
}

