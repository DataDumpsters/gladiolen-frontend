"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import Confirmdeletemodal from "@/app/components/modals/Confirmdeletemodal";
import Tshirtmodal from "@/app/components/modals/Tshirtmodal";
import { useTshirtStore } from "@/app/stores/tshirtStore";

interface TshirtTableProps {
  sizes: Size[];
  sexes: Sex[];
  jobs: Job[];
  tshirts: Tshirt[];
}

const TshirtsTable = ({ sizes, sexes, jobs, tshirts }: TshirtTableProps) => {
  const { isHydrated } = useAuthStore();
  const removeTshirt = useTshirtStore((state) => state.removeTshirt);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTshirtmodalOpen, setIsTshirtmodalOpen] = useState(false);
  const [selectedTshirtId, setSelectedTshirtId] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedTshirts = [...tshirts].sort((a, b) => {
    if (!sortColumn) return 0;
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
    // { label: "Bewerk", key: "edit" },
    // { label: "Verwijder", key: "delete" },
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
              <td key={`job-${tshirt.id}`}>{tshirt.job}</td>
              <td key={`size-${tshirt.id}`}>{tshirt.size}</td>
              <td key={`sex-${tshirt.id}`}>{tshirt.sex}</td>
              <td key={`quantity-${tshirt.id}`}>{tshirt.totalQuantity}</td>
              <td className={"flex justify-center items-center"}>
                <div className="flex justify-center items-center">
                  <PencilIcon
                    className="h-6 w-6 text-green-400"
                    onClick={() => {
                      setSelectedTshirtId(tshirt.id);
                      setIsTshirtmodalOpen(true);
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <TrashIcon
                    className="h-6 w-6 text-red-500"
                    onClick={() => {
                      setSelectedTshirtId(tshirt.id);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<Modal isOpen={isDeleteModalOpen}>*/}
      {/*  <Confirmdeletemodal*/}
      {/*    onClose={() => setIsDeleteModalOpen(false)}*/}
      {/*    id={selectedTshirtId}*/}
      {/*    removeFunction={removeTshirt}*/}
      {/*    label="tshirt"*/}
      {/*    link={`http://localhost:8080/api/tshirt/${selectedTshirtId}`}*/}
      {/*  />*/}
      {/*</Modal>*/}
      {/*<Modal isOpen={isTshirtmodalOpen}>*/}
      {/*  <Tshirtmodal*/}
      {/*    onClose={() => setIsTshirtmodalOpen(false)}*/}
      {/*    sizes={sizes}*/}
      {/*    jobs={jobs}*/}
      {/*    sexes={sexes}*/}
      {/*  />*/}
      {/*</Modal>*/}
    </div>
  );
};

export default TshirtsTable;
