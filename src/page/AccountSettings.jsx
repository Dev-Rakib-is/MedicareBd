const AccountSettings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <label className="block font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="Enter your email"
        />

        <label className="block font-medium mt-4 mb-2">Phone Number</label>
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700"
          placeholder="Enter phone number"
        />

        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
