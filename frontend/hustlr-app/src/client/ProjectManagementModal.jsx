import { useState, useRef, useEffect } from "react";
import {
  FileText,
  Upload,
  User,
  BarChart2,
  MessageSquare,
  X,
  Check,
  Clock,
  Star,
  Plus,
  Trash2,
} from "lucide-react";
import { ProjectServices } from "../services/projectServices.jsx"; // Adjust the import path as necessary
import toast from "react-hot-toast";
// import { formatDate } from "../utils/dateUtils"; // Adjust the import path as necessary

const ProjectManagementModal = ({
  project,
  milestones: initialMilestones = [], // Use prop directly
  files: initialFiles = [], // Add files prop
  onClose,
  onUpdateProgress,
  onUploadFile,
  onSendMessage,
  onMilestoneAdded,
  onFetchFiles,
  onCompleteProject,
}) => {
  const [activeTab, setActiveTab] = useState("progress");
  const [progress, setProgress] = useState(project.progress || 0);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState(initialFiles);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  // In the completion dialog
  const [rating, setRating] = useState(5);
  // const [completionNotes, setCompletionNotes] = useState("");

  // Milestones state
  const [milestones, setMilestones] = useState(initialMilestones);
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    dueDate: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Add this effect to load files when files tab is activated
  useEffect(() => {
    if (activeTab === "files" && files.length === 0) {
      loadFiles();
    }
  }, [activeTab]);

  const loadFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const fetchedFiles = await onFetchFiles(project.id);
      setFiles(fetchedFiles);
    } catch (error) {
      console.error("Error loading files:", error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Fetch milestones when modal opens or project changes
  useEffect(() => {
    const fetchMilestones = async () => {
      setIsLoadingData(true);
      try {
        const fetchedMilestones = await ProjectServices.getMilestones(
          project.id
        );
        setMilestones(fetchedMilestones);
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchMilestones();
  }, [project.id]); // Re-run when project.id changes

  // Update the handleFileUpload function
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoadingFiles(true);
        await onUploadFile(project.id, file);
        // Refresh files after upload
        await loadFiles();
        toast.success("File uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload file");
      } finally {
        setIsLoadingFiles(false);
      }
    }
  };

  const handleAddMilestone = async () => {
    if (!newMilestone.name || !newMilestone.dueDate) return;

    setIsLoading(true);
    try {
      const addedMilestone = await ProjectServices.addMilestone(project.id, {
        name: newMilestone.name,
        dueDate: newMilestone.dueDate,
        description: newMilestone.description,
      });

      const updatedMilestones = [...milestones, addedMilestone];
      setMilestones(updatedMilestones);
      // Notify parent of the update
      if (onMilestoneAdded) {
        onMilestoneAdded({
          ...project,
          milestones: updatedMilestones,
        });
      }

      //   setMilestones([...milestones, addedMilestone]);
      setNewMilestone({ name: "", dueDate: "", description: "" });
      toast.success("Milestone added successfully!");
    } catch (error) {
      console.error("Failed to add milestone:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMilestone = async (milestoneId) => {
    try {
      const updatedMilestone = await ProjectServices.toggleMilestone(
        project.id,
        milestoneId
      );

      setMilestones(
        milestones.map((m) => (m._id === milestoneId ? updatedMilestone : m))
      );
      toast.success(
        updatedMilestone.completed
          ? "Milestone marked as completed!"
          : "Milestone marked as incomplete!"
      );
    } catch (error) {
      console.error("Failed to toggle milestone:", error);
    }
  };

  const handleDeleteMilestone = async (milestoneId) => {
    try {
      await ProjectServices.deleteMilestone(project.id, milestoneId);
      setMilestones(milestones.filter((m) => m._id !== milestoneId));
      toast.success("Milestone deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete milestone:", error);
    }
  };

  // Add this handler
  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
    onUpdateProgress(project.id, parseInt(newProgress));
  };

  // Add this function
  const confirmCompletion = async () => {
    try {
      await onCompleteProject(project.id, rating);
      toast.success("Project marked as complete!");
      setShowCompletionDialog(false);
    } catch (error) {
      console.error("Completion error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{project.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 ${
              activeTab === "progress"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("progress")}
          >
            <BarChart2 size={18} />
            Progress
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 ${
              activeTab === "files"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("files")}
          >
            <FileText size={18} />
            Documents
          </button>
          <button
            className={`px-4 py-3 font-medium flex items-center gap-2 ${
              activeTab === "freelancer"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("freelancer")}
          >
            <User size={18} />
            Freelancer
          </button>
        </div>

        {/* Content Area */}
        <div
          className="p-6 overflow-auto"
          style={{ maxHeight: "calc(90vh - 150px)" }}
        >
          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Project Progress</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => handleProgressUpdate(e.target.value)}
                    className="flex-1"
                  />
                  <span className="w-16 text-center font-medium">
                    {progress}%
                  </span>
                  <button
                    onClick={() => handleProgressUpdate(progress)}
                    className="px-3 py-1 bg-primary text-white rounded-md text-sm"
                  >
                    Update
                  </button>
                </div>
                {/* Completion button - only show when progress is 100% */}
                {progress == 100 && project.status !== "completed" && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setShowCompletionDialog(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Mark Project as Complete
                    </button>
                  </div>
                )}
                {showCompletionDialog && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                      <h3 className="text-lg font-bold mb-4">
                        Complete Project
                      </h3>

                      {/* Rating Section */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rate the freelancer's work:
                        </label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  star <= rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {rating} {rating === 1 ? "star" : "stars"}
                          </span>
                        </div>
                      </div>


                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setShowCompletionDialog(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmCompletion}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Submit Rating & Complete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Milestones</h3>

                {/* Add Milestone Form */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Milestone name"
                    className="flex-1 border rounded-md px-3 py-2"
                    value={newMilestone.name}
                    onChange={(e) =>
                      setNewMilestone({ ...newMilestone, name: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="border rounded-md px-3 py-2"
                    value={newMilestone.dueDate}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        dueDate: e.target.value,
                      })
                    }
                  />
                  <textarea
                    placeholder="Description (optional)"
                    className="border rounded-md px-3 py-2"
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                  <button
                    onClick={handleAddMilestone}
                    className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-1 disabled:opacity-50"
                    disabled={
                      isLoading || !newMilestone.name || !newMilestone.dueDate
                    }
                  >
                    {isLoading ? (
                      <span>Adding...</span>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Add Milestone</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Milestones List */}
                <div className="space-y-3">
                  {isLoadingData ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : milestones.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No milestones yet
                    </p>
                  ) : (
                    milestones.map((milestone) => (
                      <div
                        key={milestone._id}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          milestone.completed
                            ? "bg-green-50 border-green-200"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleMilestone(milestone._id)}
                            className={`p-1 rounded-full ${
                              milestone.completed
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {milestone.completed ? (
                              <Check size={16} />
                            ) : (
                              <Clock size={16} />
                            )}
                          </button>
                          <div>
                            <p
                              className={`font-medium ${
                                milestone.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              }`}
                            >
                              {milestone.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Due:{" "}
                              {new Date(milestone.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeleteMilestone(milestone._id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === "files" && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isLoadingFiles}
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag files here or{" "}
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="text-primary hover:underline"
                  >
                    browse files
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports PDF, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Project Files</h3>
                {isLoadingFiles ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : files.length === 0 ? (
                  <p className="text-gray-500">No files uploaded yet</p>
                ) : (
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              Uploaded:{" "}
                              {new Date(file.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <a
                          href={
                            file.url ||
                            `/api/projects/${project.id}/files/${file.id}`
                          }
                          download
                          className="text-sm text-primary hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Freelancer Tab */}
          {activeTab === "freelancer" && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={project.freelancer?.avatar || "/placeholder-user.jpg"}
                    alt={project.freelancer?.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    {project.freelancer?.name}
                  </h3>
                  <p className="text-gray-600">{project.freelancer?.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">
                      {project.freelancer?.rating?.toFixed(1) || "N/A"}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      {project.freelancer?.completedProjects || 0} projects
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10">
                  View Profile
                </button>
              </div>

              <div>
                <h3 className="font-medium mb-3">Communication</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex gap-3">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-md p-3 min-h-[100px]"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => {
                        onSendMessage(project.id, message);
                        setMessage("");
                      }}
                      className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagementModal;
