import React from 'react';
import { cookies } from 'next/headers';

import axiosInstance from '@/lib/axiosInstance';
import DevicesTable from '@/components/DevicesTable';
import Loading from './loading'; // Import the loading component

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value; // Retrieve access_token from cookies

  const Devices = await axiosInstance.get("devices", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Pass Bearer token explicitly
    },
  }).then((res) => res.data);

  console.log(Devices);
  if (!Devices) {
    return <Loading />; // Use the loading component
  }

  return (
    <div>
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <DevicesTable Devices={Devices} />
      </div>
    </div>
  );
}

