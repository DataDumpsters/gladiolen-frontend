"use client";

import { useAuthStore } from "@/app/store/authStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import Confirmdeletemodal from "@/app/components/modals/Confirmdeletemodal";
import Tshirtmodal from "@/app/components/modals/Tshirtmodal";

interface TshirtTableProps {
  sizes: Size[];
  sexes: Sex[];
  jobs: Job[];
  tshirts: Tshirt[];
}

const TshirtsTable = ({ sizes, sexes, jobs, tshirts }: TshirtTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTshirtmodalOpen, setIsTshirtmodalOpen] = useState(false);
  const [selectedTshirtId, setSelectedTshirtId] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { isHydrated } = useAuthStore();

  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedTshirts = [...tshirts].sort((a, b) => {
    if (!sortColumn) return 0;
    // const aValue =
    //   sortColumn === "union"
    //     ? (a.union?.name ?? "")
    //     : (a[sortColumn as keyof User] ?? "");
    // const bValue =
    //   sortColumn === "union"
    //     ? (b.union?.name ?? "")
    //     : (b[sortColumn as keyof User] ?? "");
    // if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    // if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (tshirts.length === 0) {
    return <p>Geen tshirts gevonden.</p>;
  }

  const headers = [
    { label: "Functie", key: "job" },
    { label: "Maat", key: "size" },
    { label: "Geslacht", key: "sex" },
    { label: "quantity", key: "totalQuantity" },
  ];

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead className={"bg-gladiolentext text-white"}>
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                className="py-2 px-4 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort(header.key)}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTshirts.map((tshirt) => (
            <tr key={tshirt.id} className={"text-center"}>
              <td>{tshirt.job}</td>
              <td>{tshirt.size}</td>
              <td>{tshirt.sex}</td>
              <td>{tshirt.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isDeleteModalOpen}>
        <Confirmdeletemodal
          onClose={() => setIsDeleteModalOpen(false)}
          userId={selectedTshirtId}
        />
      </Modal>
      <Modal isOpen={isTshirtmodalOpen}>
        <Tshirtmodal
          onClose={() => setIsTshirtmodalOpen(false)}
          sizes={sizes}
          jobs={jobs}
          sexes={sexes}
        />
      </Modal>
    </div>
  );
};

export default TshirtsTable;
