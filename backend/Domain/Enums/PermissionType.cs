namespace Domain.Enums;

public enum PermissionType
{
    // Permissions for the Reception Team
    AccessInitialPatientData = 1,  // Access to initial patient data
    EditPatientPersonalInformation, // Edit patient's personal information
    AccessHealthData,  // Cannot access health data (not granted, but could be useful to deny access if necessary)
    DownloadCompletedMedicalRecord, // Download medical record at the end of the patient's cycle

    // Permissions for the Health Team
    FullSystemAccess,  // Full access to the system
    AccessPatientData,    // Access to patient data
    AccessHealthFeatures,  // Access to health-related functionalities

    // Permissions for the Institution Management
    FullAccessToEverything,  // Full access to everything in the system
    ManageUsers,   // Permission to manage users and configurations (could be additional)
    ManageSystemConfigurations  // Permission to manage system configurations and administrative data
}