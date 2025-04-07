'use client'
import React, { Suspense, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import dynamic from "next/dynamic";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from "recharts";

import { deviceStore } from "@/store/devicesStore";
import { Device } from "@/schema/device";
import { Button } from "@heroui/button";
import Link from "next/link";

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function DevicesTable({ Devices }: { Devices: Device[] }) {
  const { setDevices, devices, initalized } = deviceStore();

  useEffect(() => {
    if (devices.length <= 0) {
      setDevices(Array.isArray(Devices) ? Devices : [Devices]);
    }
  }, []);

  const deviceData = initalized ? devices : Devices;

  const chartData = deviceData.map((device) => ({
    name: device.name,
    powerConsumption:
      typeof device.totalPowerConsumptionSum === "number"
        ? device.totalPowerConsumptionSum
        : typeof device.totalPowerConsumptionSum === "object"
        ? Object.values(device.totalPowerConsumptionSum).reduce((sum, value) => {
            const numericValue = parseFloat(value.split(" ")[0]);

            return sum + (isNaN(numericValue) ? 0 : numericValue);
          }, 0)
        : parseFloat(device.totalPowerConsumptionSum || "0"),
  }));

  return (
    <div>
      <Card shadow="none">
        <CardBody className="gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="text-2xl text-primary" icon="lucide:devices" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Device Management</h1>
                <p className="text-small text-default-500">Manage your device database</p>
              </div>
            </div>
          </div>

          <Divider />

          <Table
            aria-label="Device table"
            className="mt-4"
            shadow="none"
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>TEMPERATURE</TableColumn>
              <TableColumn>HUMIDITY</TableColumn>
              <TableColumn>LOCATION</TableColumn>
              <TableColumn>TOTAL POWER</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {deviceData.map((device: Device) => (
                <TableRow
                  key={device.id}
                  className={`h-16 ${device.status === "on" ? "bg-success/10" : "bg-danger/10"}`}
                >
                  <TableCell>
                    <span className="font-medium">{device.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{device.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`capitalize font-medium ${device.status === "on" ? "text-success" : "text-danger"}`}>
                      {device.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{parseFloat(device.temperature)}°C</span>
                  </TableCell>
                  <TableCell>
                    <span>{parseFloat(device.humidity)}%</span>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      aria-label="Location"
                      content={`Latitude: ${device.lat}, Longitude: ${device.lng}`}
                      size="sm"
                    >
                      <span className="text-primary cursor-pointer">
                        {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <span>
                      {typeof device.totalPowerConsumptionSum === "string"
                        ? device.totalPowerConsumptionSum
                        : JSON.stringify(device.totalPowerConsumptionSum)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" color="primary" as={Link} href={`/devices/${device.id}`}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider />

          {/* Map Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Device Locations</h2>
            <Suspense fallback={<div>loading...</div>}>
              <Map
                markers={deviceData.map((device) => ({
                  lat: device.lat,
                  lng: device.lng,
                  label: device.name,
                }))}
              />
            </Suspense>
          </div>

          {/* Chart Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Power Consumption Chart</h2>
            <BarChart
              data={chartData}
              height={300}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              width={600}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="powerConsumption" fill="#4bc0c0" />
            </BarChart>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


