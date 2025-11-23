const ProfileSettings = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Profile Settings</h1>

      <form className="space-y-4 max-w-lg">
        <div>
          <label className="font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="font-medium">Bio</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Write something"
          ></textarea>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
