import { useEffect, useMemo, useState } from "react";

const buildEmptyForm = () => ({
  projectName: "",
  description: "",
  status: "NOT_STARTED",
  startDate: new Date().toISOString().split("T")[0],
  expectedEndDate: "",
  clientId: "",
  teamMembers: [],
  progress: 0,
});

const normalizeInitialData = (data) => {
  if (!data) {
    return buildEmptyForm();
  }

  return {
    projectName: data.projectName || data.name || "",
    description: data.description || "",
    status: data.status || "NOT_STARTED",
    startDate: data.startDate
      ? new Date(data.startDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    expectedEndDate: data.expectedEndDate
      ? new Date(data.expectedEndDate).toISOString().split("T")[0]
      : "",
    clientId: data.clientId?._id || data.clientId || "",
    teamMembers: Array.isArray(data.teamMembers)
      ? data.teamMembers.map((member) => member._id || member)
      : [],
    progress: typeof data.progress === "number" ? data.progress : 0,
  };
};

const useProjectForm = ({
  initialData,
  isAdmin,
  isOpen,
  onSubmit,
  teamMembers,
}) => {
  const [formData, setFormData] = useState(() =>
    normalizeInitialData(initialData)
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(normalizeInitialData(initialData));
  }, [initialData, isOpen]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "progress" ? Number(value) : value,
    }));
  };

  const addTeamMember = (memberId) => {
    setFormData((prev) => {
      if (prev.teamMembers.includes(memberId)) {
        return prev;
      }

      return {
        ...prev,
        teamMembers: [...prev.teamMembers, memberId],
      };
    });
  };

  const removeTeamMember = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((id) => id !== memberId),
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (isAdmin && !formData.clientId) {
      alert("Please assign a client.");
      return;
    }

    onSubmit({
      ...formData,
      progress: Number(formData.progress) || 0,
    });

    if (!initialData) {
      setFormData(buildEmptyForm());
    }
  };

  const availableMembers = useMemo(() => {
    if (!Array.isArray(teamMembers)) {
      return [];
    }

    return teamMembers.filter(
      (member) => !formData.teamMembers.includes(member._id)
    );
  }, [teamMembers, formData.teamMembers]);

  const isEditMode = Boolean(initialData);

  return {
    formData,
    handleFieldChange,
    addTeamMember,
    removeTeamMember,
    submitForm,
    availableMembers,
    isEditMode,
  };
};

export default useProjectForm;
