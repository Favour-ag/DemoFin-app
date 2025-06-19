export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">General Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your application's general settings and appearance.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Company name</label>
          <input
            type="text"
            placeholder="Enter company name"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Company email address
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full border px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">@</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company logo</label>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
              OR
            </div>
            <label className="flex-1 border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer text-sm text-gray-500">
              <input type="file" className="hidden" />
              <span className="text-purple-600 font-medium underline">
                Click to upload
              </span>{" "}
              or drag and drop
              <br />
              <span className="text-xs text-gray-400">
                SVG, PNG, JPG or GIF (max. 800×400px)
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="border px-4 py-2 rounded-md text-sm text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
