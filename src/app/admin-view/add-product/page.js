"use client";

import TileComponent from "@/components/Form/Tile";

export default function AdminAddNewProduct() {
  function handleImage() {}

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
            //   selected={formData.sizes}
            //   onClick={handleTileClick}
            //   data={AvailableSizes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
