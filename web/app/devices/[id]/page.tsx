import { cookies } from "next/headers";

import DeviceDetails from "@/components/DeviceDetails";
import axiosInstance from "@/lib/axiosInstance";

export default async function DevicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('access_token')?.value; // Retrieve access_token from cookies

    const Device = await axiosInstance.get(`devices/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Pass Bearer token explicitly
        },
    }).then((res) => res.data);
  
    console.log(Device)

    return (
        <div >
            <DeviceDetails device={Device} />
        </div>
    );
}