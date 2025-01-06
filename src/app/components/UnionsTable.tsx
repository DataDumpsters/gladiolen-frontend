"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import Confirmdeletemodal from "@/app/components/modals/Confirmdeletemodal";
import { useUnionStore } from "@/app/stores/unionStore";
import Unionmodal from "@/app/components/modals/Unionmodal";

interface UnionTableProps {
  unions: Union[];
}

const UnionTable = ({ unions }: UnionTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUnionmodalOpen, setIsUnionmodalOpen] = useState(false);
  const [selectedUnionId, setSelectedUnionId] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { isHydrated } = useAuthStore();

  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const sortedUnions = [...unions].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof Union] ?? "";
    const bValue = b[sortColumn as keyof Union] ?? "";
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const headers = [
    { label: "Naam", key: "name" },
    { label: "Adres", key: "address" },
    { label: "Postcode", key: "postalCode" },
    { label: "Gemeente", key: "municipality" },
    { label: "BTW-nummer", key: "vatNumber" },
    { label: "Rekeningnummer", key: "accountNumber" },
    { label: "Aantal Parkeertickets", key: "numberOfParkingTickets" },
    { label: "Bewerk", key: "edit" },
    { label: "Verwijder", key: "delete" },
  ];

  return (
    <div>
      {!isHydrated ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : unions.length === 0 ? (
        <p>Geen verenigingen gevonden.</p>
      ) : (
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
            {sortedUnions.map((union) => (
              <tr key={union.id} className={"text-center"}>
                <td>{union.name}</td>
                <td>{union.address}</td>
                <td>{union.postalCode}</td>
                <td>{union.municipality}</td>
                <td>{union.vatNumber}</td>
                <td>{union.accountNumber}</td>
                <td>{union.numberOfParkingTickets}</td>
                <td className={"flex justify-center items-center"}>
                  <div className="flex justify-center items-center">
                    <PencilIcon
                      className="h-6 w-6 text-green-400"
                      onClick={() => {
                        setSelectedUnionId(union.id);
                        setIsUnionmodalOpen(true);
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center items-center">
                    <TrashIcon
                      className="h-6 w-6 text-red-500"
                      onClick={() => {
                        setSelectedUnionId(union.id);
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal isOpen={isDeleteModalOpen}>
        <Confirmdeletemodal
          onClose={() => setIsDeleteModalOpen(false)}
          id={selectedUnionId}
          removeFunction={useUnionStore((state) => state.removeUnion)}
          label={"vereniging"}
          link={`http://localhost:8080/api/union/${selectedUnionId}`}
          options={{ method: "DELETE" }}
        />
      </Modal>
      <Modal isOpen={isUnionmodalOpen}>
        <Unionmodal
          onClose={() => setIsUnionmodalOpen(false)}
          unionId={selectedUnionId}
        />
      </Modal>
    </div>
  );
};

export default UnionTable;
