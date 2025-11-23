const PreferenceSettings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Preferences</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Dark Mode</span>
          <input type="checkbox" className="h-5 w-5" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Language</span>
          <select className="border p-2 rounded dark:bg-gray-700">
            <option>English</option>
            <option>Bangla</option>
            <option>Hindi</option>
          </select>
        </div>

        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default PreferenceSettings;
