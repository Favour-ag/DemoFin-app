"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Info, User, Clock, Globe, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { singleAudit } from "@/lib/api/auditcalls";

type AuditLog = {
  _id: string;
  timestamp: string;
  userId: string;
  username: string;
  actionType: string;
  entityType: string;
  entityId: string;
  description: string;
  ipAddress: string;
  previousValues: Record<string, any> | null;
  newValues: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
};

export type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

export default function SingleAuditPage({ params }: Props) {
  const router = useRouter();
  const [data, setData] = useState<AuditLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const { id } = await params;
        const result = await singleAudit(id);
        setData(result);
      } catch (error) {
        console.error("Error fetching audit log:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [params]);

  if (loading) return <p className="text-center mt-10">Loading audit details...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">Audit log not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-200 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button onClick={() => router.back()} className="px-3 py-1 text-sm border">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Audit Log Detail</h1>
        </div>
        <span className="text-sm text-gray-500">
          ID: <code>{data._id}</code>
        </span>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="font-medium text-gray-900">{data.username}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Action Type</p>
              <p className="font-medium text-gray-900">{data.actionType}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Entity Type</p>
              <p className="font-medium text-gray-900">{data.entityType}</p>
              <p className="text-xs text-gray-500">Entity ID: {data.entityId}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-gray-500 text-sm">Timestamp</p>
              <p className="font-medium text-gray-900">
                {new Date(data.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-gray-500 text-sm">IP Address</p>
              <p className="font-medium text-gray-900">{data.ipAddress}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 border-t pt-4">
        <p className="text-gray-500 text-sm mb-1">Description</p>
        <p className="text-gray-800 font-medium">{data.description}</p>
      </div>

      {/* State Changes */}
      <div className="mt-6 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-semibold mb-2">Previous Values</p>
          {data.previousValues ? (
            <pre className="bg-gray-50 p-3 text-sm rounded-md border text-gray-700">
              {JSON.stringify(data.previousValues, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-400 italic">No previous state</p>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">New Values</p>
          {data.newValues ? (
            <pre className="bg-gray-50 p-3 text-sm rounded-md border text-gray-700">
              {JSON.stringify(data.newValues, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-400 italic">No new state</p>
          )}
        </div>
      </div>
    </div>
  );
}
