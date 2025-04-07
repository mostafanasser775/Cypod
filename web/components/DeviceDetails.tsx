'use client'
import React from 'react';
import { Card, CardBody } from "@heroui/card";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaThermometerHalf, FaTint, FaMapMarkerAlt, FaBolt, FaChartLine } from 'react-icons/fa';

const DeviceDetails = ({ device }: { device: any }) => {
    const chartData = Object.entries(device.totalPowerConsumption || {}).map(([month, consumption]) => ({
        month,
        consumption: parseFloat(consumption as string) || 0, // Ensure consumption is a number
    }));

    return (
        <div className="p-6 flex flex-col max-w-7xl justify-center items-center mx-auto space-y-8">
            {/* Device Overview Card */}
            <Card shadow="none" className="w-full">
                <CardBody className="gap-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <FaBolt className="text-primary" /> Device Details
                        </h1>
                        <p className="text-default-500 text-sm">Comprehensive information about the selected device</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-2xl font-semibold">{device.name}</h2>
                            <p className="mt-2">
                                <strong>Status:</strong>{' '}
                                <span className={`capitalize ${device.status === "on" ? "text-success" : "text-danger"}`}>
                                    {device.status}
                                </span>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <FaThermometerHalf className="text-primary" /> <strong>Temperature:</strong> {device.temperature}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaTint className="text-primary" /> <strong>Humidity:</strong> {device.humidity}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-primary" /> <strong>Location:</strong> Lat {device.lat}, Lng {device.lng}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Power Consumption Table */}
            <Card shadow="none" className="w-full">
                <CardBody>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <FaChartLine className="text-primary" /> Total Power Consumption
                    </h3>
                    <Table aria-label="Power Consumption Table" shadow="none">
                        <TableHeader>
                            <TableColumn>Month</TableColumn>
                            <TableColumn>Consumption (kW)</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {chartData.map(({ month, consumption }) => (
                                <TableRow key={month}>
                                    <TableCell>{month}</TableCell>
                                    <TableCell>{consumption}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>

            {/* Power Consumption Chart */}
            <Card shadow="none" className="w-full">
                <CardBody>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                        <FaChartLine className="text-primary" /> Power Consumption Chart
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="consumption" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
        </div>
    );
};

export default DeviceDetails;
