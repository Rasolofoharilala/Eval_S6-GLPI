// Auto-generated file. Do not edit manually.
// Generated from GLPI swagger schemas using docs/find_schema.py.

import type * as Schemas from './schemas'

export interface EndpointRequestBodyMap {
  'POST /Administration/ApprovalSubstitute': PostAdministrationApprovalSubstituteBody
  'POST /Administration/Entity': PostAdministrationEntityBody
  'PATCH /Administration/Entity/{id}': PatchAdministrationEntityByIdBody
  'POST /Administration/Entity/{items_id}/KBArticle': PostAdministrationEntityByItemsIdKBArticleBody
  'PATCH /Administration/Entity/{items_id}/KBArticle/{id}': PatchAdministrationEntityByItemsIdKBArticleByIdBody
  'POST /Administration/Group': PostAdministrationGroupBody
  'PATCH /Administration/Group/{id}': PatchAdministrationGroupByIdBody
  'POST /Administration/Profile': PostAdministrationProfileBody
  'PATCH /Administration/Profile/{id}': PatchAdministrationProfileByIdBody
  'POST /Administration/User': PostAdministrationUserBody
  'PATCH /Administration/User/Me/Preference': PatchAdministrationUserMePreferenceBody
  'PATCH /Administration/User/username/{username}': PatchAdministrationUserUsernameByUsernameBody
  'PATCH /Administration/User/{id}': PatchAdministrationUserByIdBody
  'PATCH /Administration/User/{id}/Preference': PatchAdministrationUserByIdPreferenceBody
  'PATCH /Administration/User/{username}/Preference': PatchAdministrationUserByUsernamePreferenceBody
  'POST /Administration/User/{users_id}/Certificate': PostAdministrationUserByUsersIdCertificateBody
  'PATCH /Administration/User/{users_id}/Certificate/{id}': PatchAdministrationUserByUsersIdCertificateByIdBody
  'POST /Administration/UserCategory': PostAdministrationUserCategoryBody
  'PATCH /Administration/UserCategory/{id}': PatchAdministrationUserCategoryByIdBody
  'POST /Administration/UserTitle': PostAdministrationUserTitleBody
  'PATCH /Administration/UserTitle/{id}': PatchAdministrationUserTitleByIdBody
  'POST /Appliance/{items_id}/Note': PostApplianceByItemsIdNoteBody
  'PATCH /Appliance/{items_id}/Note/{id}': PatchApplianceByItemsIdNoteByIdBody
  'POST /Assets/Appliance': PostAssetsApplianceBody
  'POST /Assets/Appliance/{asset_id}/Antivirus': PostAssetsApplianceByAssetIdAntivirusBody
  'PATCH /Assets/Appliance/{asset_id}/Antivirus/{id}': PatchAssetsApplianceByAssetIdAntivirusByIdBody
  'POST /Assets/Appliance/{asset_id}/Appliance': PostAssetsApplianceByAssetIdApplianceBody
  'POST /Assets/Appliance/{asset_id}/Certificate': PostAssetsApplianceByAssetIdCertificateBody
  'PATCH /Assets/Appliance/{asset_id}/Certificate/{id}': PatchAssetsApplianceByAssetIdCertificateByIdBody
  'POST /Assets/Appliance/{asset_id}/Contract': PostAssetsApplianceByAssetIdContractBody
  'PATCH /Assets/Appliance/{asset_id}/Contract/{id}': PatchAssetsApplianceByAssetIdContractByIdBody
  'POST /Assets/Appliance/{asset_id}/Domain': PostAssetsApplianceByAssetIdDomainBody
  'PATCH /Assets/Appliance/{asset_id}/Domain/{id}': PatchAssetsApplianceByAssetIdDomainByIdBody
  'POST /Assets/Appliance/{asset_id}/KBArticle': PostAssetsApplianceByAssetIdKBArticleBody
  'PATCH /Assets/Appliance/{asset_id}/KBArticle/{id}': PatchAssetsApplianceByAssetIdKBArticleByIdBody
  'POST /Assets/Appliance/{asset_id}/PeripheralConnection': PostAssetsApplianceByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Appliance/{asset_id}/PeripheralConnection/{id}': PatchAssetsApplianceByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Appliance/{asset_id}/Project': PostAssetsApplianceByAssetIdProjectBody
  'PATCH /Assets/Appliance/{asset_id}/Project/{id}': PatchAssetsApplianceByAssetIdProjectByIdBody
  'POST /Assets/Appliance/{asset_id}/RemoteManagement': PostAssetsApplianceByAssetIdRemoteManagementBody
  'PATCH /Assets/Appliance/{asset_id}/RemoteManagement/{id}': PatchAssetsApplianceByAssetIdRemoteManagementByIdBody
  'POST /Assets/Appliance/{asset_id}/SoftwareInstallation': PostAssetsApplianceByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Appliance/{asset_id}/SoftwareInstallation/{id}': PatchAssetsApplianceByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Appliance/{asset_id}/VirtualMachine': PostAssetsApplianceByAssetIdVirtualMachineBody
  'PATCH /Assets/Appliance/{asset_id}/VirtualMachine/{id}': PatchAssetsApplianceByAssetIdVirtualMachineByIdBody
  'POST /Assets/Appliance/{asset_id}/Volume': PostAssetsApplianceByAssetIdVolumeBody
  'PATCH /Assets/Appliance/{asset_id}/Volume/{id}': PatchAssetsApplianceByAssetIdVolumeByIdBody
  'PATCH /Assets/Appliance/{id}': PatchAssetsApplianceByIdBody
  'PATCH /Assets/Appliance/{id}/Infocom': PatchAssetsApplianceByIdInfocomBody
  'POST /Assets/Appliance/{id}/Infocom': PostAssetsApplianceByIdInfocomBody
  'POST /Assets/Cable': PostAssetsCableBody
  'PATCH /Assets/Cable/{id}': PatchAssetsCableByIdBody
  'PATCH /Assets/Cable/{id}/Infocom': PatchAssetsCableByIdInfocomBody
  'POST /Assets/Cable/{id}/Infocom': PostAssetsCableByIdInfocomBody
  'POST /Assets/Cartridge': PostAssetsCartridgeBody
  'POST /Assets/Cartridge/{cartridgeitems_id}': PostAssetsCartridgeByCartridgeitemsIdBody
  'PATCH /Assets/Cartridge/{cartridgeitems_id}/{id}': PatchAssetsCartridgeByCartridgeitemsIdByIdBody
  'PATCH /Assets/Cartridge/{id}': PatchAssetsCartridgeByIdBody
  'PATCH /Assets/Cartridge/{id}/Infocom': PatchAssetsCartridgeByIdInfocomBody
  'POST /Assets/Cartridge/{id}/Infocom': PostAssetsCartridgeByIdInfocomBody
  'PATCH /Assets/CartridgeItem/{id}/Infocom': PatchAssetsCartridgeItemByIdInfocomBody
  'POST /Assets/CartridgeItem/{id}/Infocom': PostAssetsCartridgeItemByIdInfocomBody
  'POST /Assets/Certificate': PostAssetsCertificateBody
  'POST /Assets/Certificate/{asset_id}/Antivirus': PostAssetsCertificateByAssetIdAntivirusBody
  'PATCH /Assets/Certificate/{asset_id}/Antivirus/{id}': PatchAssetsCertificateByAssetIdAntivirusByIdBody
  'POST /Assets/Certificate/{asset_id}/Appliance': PostAssetsCertificateByAssetIdApplianceBody
  'POST /Assets/Certificate/{asset_id}/Contract': PostAssetsCertificateByAssetIdContractBody
  'PATCH /Assets/Certificate/{asset_id}/Contract/{id}': PatchAssetsCertificateByAssetIdContractByIdBody
  'POST /Assets/Certificate/{asset_id}/Domain': PostAssetsCertificateByAssetIdDomainBody
  'PATCH /Assets/Certificate/{asset_id}/Domain/{id}': PatchAssetsCertificateByAssetIdDomainByIdBody
  'POST /Assets/Certificate/{asset_id}/KBArticle': PostAssetsCertificateByAssetIdKBArticleBody
  'PATCH /Assets/Certificate/{asset_id}/KBArticle/{id}': PatchAssetsCertificateByAssetIdKBArticleByIdBody
  'POST /Assets/Certificate/{asset_id}/PeripheralConnection': PostAssetsCertificateByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Certificate/{asset_id}/PeripheralConnection/{id}': PatchAssetsCertificateByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Certificate/{asset_id}/Project': PostAssetsCertificateByAssetIdProjectBody
  'PATCH /Assets/Certificate/{asset_id}/Project/{id}': PatchAssetsCertificateByAssetIdProjectByIdBody
  'POST /Assets/Certificate/{asset_id}/RemoteManagement': PostAssetsCertificateByAssetIdRemoteManagementBody
  'PATCH /Assets/Certificate/{asset_id}/RemoteManagement/{id}': PatchAssetsCertificateByAssetIdRemoteManagementByIdBody
  'POST /Assets/Certificate/{asset_id}/SoftwareInstallation': PostAssetsCertificateByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Certificate/{asset_id}/SoftwareInstallation/{id}': PatchAssetsCertificateByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Certificate/{asset_id}/VirtualMachine': PostAssetsCertificateByAssetIdVirtualMachineBody
  'PATCH /Assets/Certificate/{asset_id}/VirtualMachine/{id}': PatchAssetsCertificateByAssetIdVirtualMachineByIdBody
  'POST /Assets/Certificate/{asset_id}/Volume': PostAssetsCertificateByAssetIdVolumeBody
  'PATCH /Assets/Certificate/{asset_id}/Volume/{id}': PatchAssetsCertificateByAssetIdVolumeByIdBody
  'PATCH /Assets/Certificate/{id}': PatchAssetsCertificateByIdBody
  'PATCH /Assets/Certificate/{id}/Infocom': PatchAssetsCertificateByIdInfocomBody
  'POST /Assets/Certificate/{id}/Infocom': PostAssetsCertificateByIdInfocomBody
  'POST /Assets/Computer': PostAssetsComputerBody
  'POST /Assets/Computer/{asset_id}/Antivirus': PostAssetsComputerByAssetIdAntivirusBody
  'PATCH /Assets/Computer/{asset_id}/Antivirus/{id}': PatchAssetsComputerByAssetIdAntivirusByIdBody
  'POST /Assets/Computer/{asset_id}/Appliance': PostAssetsComputerByAssetIdApplianceBody
  'POST /Assets/Computer/{asset_id}/Certificate': PostAssetsComputerByAssetIdCertificateBody
  'PATCH /Assets/Computer/{asset_id}/Certificate/{id}': PatchAssetsComputerByAssetIdCertificateByIdBody
  'POST /Assets/Computer/{asset_id}/Contract': PostAssetsComputerByAssetIdContractBody
  'PATCH /Assets/Computer/{asset_id}/Contract/{id}': PatchAssetsComputerByAssetIdContractByIdBody
  'POST /Assets/Computer/{asset_id}/Domain': PostAssetsComputerByAssetIdDomainBody
  'PATCH /Assets/Computer/{asset_id}/Domain/{id}': PatchAssetsComputerByAssetIdDomainByIdBody
  'POST /Assets/Computer/{asset_id}/KBArticle': PostAssetsComputerByAssetIdKBArticleBody
  'PATCH /Assets/Computer/{asset_id}/KBArticle/{id}': PatchAssetsComputerByAssetIdKBArticleByIdBody
  'POST /Assets/Computer/{asset_id}/Line': PostAssetsComputerByAssetIdLineBody
  'PATCH /Assets/Computer/{asset_id}/Line/{id}': PatchAssetsComputerByAssetIdLineByIdBody
  'POST /Assets/Computer/{asset_id}/PeripheralConnection': PostAssetsComputerByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Computer/{asset_id}/PeripheralConnection/{id}': PatchAssetsComputerByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Computer/{asset_id}/Project': PostAssetsComputerByAssetIdProjectBody
  'PATCH /Assets/Computer/{asset_id}/Project/{id}': PatchAssetsComputerByAssetIdProjectByIdBody
  'POST /Assets/Computer/{asset_id}/RemoteManagement': PostAssetsComputerByAssetIdRemoteManagementBody
  'PATCH /Assets/Computer/{asset_id}/RemoteManagement/{id}': PatchAssetsComputerByAssetIdRemoteManagementByIdBody
  'POST /Assets/Computer/{asset_id}/SoftwareInstallation': PostAssetsComputerByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Computer/{asset_id}/SoftwareInstallation/{id}': PatchAssetsComputerByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Computer/{asset_id}/VirtualMachine': PostAssetsComputerByAssetIdVirtualMachineBody
  'PATCH /Assets/Computer/{asset_id}/VirtualMachine/{id}': PatchAssetsComputerByAssetIdVirtualMachineByIdBody
  'POST /Assets/Computer/{asset_id}/Volume': PostAssetsComputerByAssetIdVolumeBody
  'PATCH /Assets/Computer/{asset_id}/Volume/{id}': PatchAssetsComputerByAssetIdVolumeByIdBody
  'PATCH /Assets/Computer/{id}': PatchAssetsComputerByIdBody
  'PATCH /Assets/Computer/{id}/Infocom': PatchAssetsComputerByIdInfocomBody
  'POST /Assets/Computer/{id}/Infocom': PostAssetsComputerByIdInfocomBody
  'POST /Assets/Consumable': PostAssetsConsumableBody
  'POST /Assets/Consumable/{consumableitems_id}': PostAssetsConsumableByConsumableitemsIdBody
  'PATCH /Assets/Consumable/{consumableitems_id}/{id}': PatchAssetsConsumableByConsumableitemsIdByIdBody
  'PATCH /Assets/Consumable/{id}': PatchAssetsConsumableByIdBody
  'PATCH /Assets/Consumable/{id}/Infocom': PatchAssetsConsumableByIdInfocomBody
  'POST /Assets/Consumable/{id}/Infocom': PostAssetsConsumableByIdInfocomBody
  'PATCH /Assets/ConsumableItem/{id}/Infocom': PatchAssetsConsumableItemByIdInfocomBody
  'POST /Assets/ConsumableItem/{id}/Infocom': PostAssetsConsumableItemByIdInfocomBody
  'POST /Assets/DCRoom/{asset_id}/Contract': PostAssetsDCRoomByAssetIdContractBody
  'PATCH /Assets/DCRoom/{asset_id}/Contract/{id}': PatchAssetsDCRoomByAssetIdContractByIdBody
  'POST /Assets/Enclosure': PostAssetsEnclosureBody
  'POST /Assets/Enclosure/{asset_id}/Contract': PostAssetsEnclosureByAssetIdContractBody
  'PATCH /Assets/Enclosure/{asset_id}/Contract/{id}': PatchAssetsEnclosureByAssetIdContractByIdBody
  'PATCH /Assets/Enclosure/{id}': PatchAssetsEnclosureByIdBody
  'PATCH /Assets/Enclosure/{id}/Infocom': PatchAssetsEnclosureByIdInfocomBody
  'POST /Assets/Enclosure/{id}/Infocom': PostAssetsEnclosureByIdInfocomBody
  'POST /Assets/Monitor': PostAssetsMonitorBody
  'POST /Assets/Monitor/{asset_id}/Antivirus': PostAssetsMonitorByAssetIdAntivirusBody
  'PATCH /Assets/Monitor/{asset_id}/Antivirus/{id}': PatchAssetsMonitorByAssetIdAntivirusByIdBody
  'POST /Assets/Monitor/{asset_id}/Appliance': PostAssetsMonitorByAssetIdApplianceBody
  'POST /Assets/Monitor/{asset_id}/Contract': PostAssetsMonitorByAssetIdContractBody
  'PATCH /Assets/Monitor/{asset_id}/Contract/{id}': PatchAssetsMonitorByAssetIdContractByIdBody
  'POST /Assets/Monitor/{asset_id}/Domain': PostAssetsMonitorByAssetIdDomainBody
  'PATCH /Assets/Monitor/{asset_id}/Domain/{id}': PatchAssetsMonitorByAssetIdDomainByIdBody
  'POST /Assets/Monitor/{asset_id}/KBArticle': PostAssetsMonitorByAssetIdKBArticleBody
  'PATCH /Assets/Monitor/{asset_id}/KBArticle/{id}': PatchAssetsMonitorByAssetIdKBArticleByIdBody
  'POST /Assets/Monitor/{asset_id}/PeripheralConnection': PostAssetsMonitorByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Monitor/{asset_id}/PeripheralConnection/{id}': PatchAssetsMonitorByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Monitor/{asset_id}/Project': PostAssetsMonitorByAssetIdProjectBody
  'PATCH /Assets/Monitor/{asset_id}/Project/{id}': PatchAssetsMonitorByAssetIdProjectByIdBody
  'POST /Assets/Monitor/{asset_id}/RemoteManagement': PostAssetsMonitorByAssetIdRemoteManagementBody
  'PATCH /Assets/Monitor/{asset_id}/RemoteManagement/{id}': PatchAssetsMonitorByAssetIdRemoteManagementByIdBody
  'POST /Assets/Monitor/{asset_id}/SoftwareInstallation': PostAssetsMonitorByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Monitor/{asset_id}/SoftwareInstallation/{id}': PatchAssetsMonitorByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Monitor/{asset_id}/VirtualMachine': PostAssetsMonitorByAssetIdVirtualMachineBody
  'PATCH /Assets/Monitor/{asset_id}/VirtualMachine/{id}': PatchAssetsMonitorByAssetIdVirtualMachineByIdBody
  'POST /Assets/Monitor/{asset_id}/Volume': PostAssetsMonitorByAssetIdVolumeBody
  'PATCH /Assets/Monitor/{asset_id}/Volume/{id}': PatchAssetsMonitorByAssetIdVolumeByIdBody
  'PATCH /Assets/Monitor/{id}': PatchAssetsMonitorByIdBody
  'PATCH /Assets/Monitor/{id}/Infocom': PatchAssetsMonitorByIdInfocomBody
  'POST /Assets/Monitor/{id}/Infocom': PostAssetsMonitorByIdInfocomBody
  'POST /Assets/NetworkEquipment': PostAssetsNetworkEquipmentBody
  'POST /Assets/NetworkEquipment/{asset_id}/Antivirus': PostAssetsNetworkEquipmentByAssetIdAntivirusBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Antivirus/{id}': PatchAssetsNetworkEquipmentByAssetIdAntivirusByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/Appliance': PostAssetsNetworkEquipmentByAssetIdApplianceBody
  'POST /Assets/NetworkEquipment/{asset_id}/Certificate': PostAssetsNetworkEquipmentByAssetIdCertificateBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Certificate/{id}': PatchAssetsNetworkEquipmentByAssetIdCertificateByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/Contract': PostAssetsNetworkEquipmentByAssetIdContractBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Contract/{id}': PatchAssetsNetworkEquipmentByAssetIdContractByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/Domain': PostAssetsNetworkEquipmentByAssetIdDomainBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Domain/{id}': PatchAssetsNetworkEquipmentByAssetIdDomainByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/KBArticle': PostAssetsNetworkEquipmentByAssetIdKBArticleBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/KBArticle/{id}': PatchAssetsNetworkEquipmentByAssetIdKBArticleByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/Line': PostAssetsNetworkEquipmentByAssetIdLineBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Line/{id}': PatchAssetsNetworkEquipmentByAssetIdLineByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/PeripheralConnection': PostAssetsNetworkEquipmentByAssetIdPeripheralConnectionBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/PeripheralConnection/{id}': PatchAssetsNetworkEquipmentByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/Project': PostAssetsNetworkEquipmentByAssetIdProjectBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Project/{id}': PatchAssetsNetworkEquipmentByAssetIdProjectByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/RemoteManagement': PostAssetsNetworkEquipmentByAssetIdRemoteManagementBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/RemoteManagement/{id}': PatchAssetsNetworkEquipmentByAssetIdRemoteManagementByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/SoftwareInstallation': PostAssetsNetworkEquipmentByAssetIdSoftwareInstallationBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/SoftwareInstallation/{id}': PatchAssetsNetworkEquipmentByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/VirtualMachine': PostAssetsNetworkEquipmentByAssetIdVirtualMachineBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/VirtualMachine/{id}': PatchAssetsNetworkEquipmentByAssetIdVirtualMachineByIdBody
  'POST /Assets/NetworkEquipment/{asset_id}/Volume': PostAssetsNetworkEquipmentByAssetIdVolumeBody
  'PATCH /Assets/NetworkEquipment/{asset_id}/Volume/{id}': PatchAssetsNetworkEquipmentByAssetIdVolumeByIdBody
  'PATCH /Assets/NetworkEquipment/{id}': PatchAssetsNetworkEquipmentByIdBody
  'PATCH /Assets/NetworkEquipment/{id}/Infocom': PatchAssetsNetworkEquipmentByIdInfocomBody
  'POST /Assets/NetworkEquipment/{id}/Infocom': PostAssetsNetworkEquipmentByIdInfocomBody
  'POST /Assets/PDU': PostAssetsPDUBody
  'POST /Assets/PDU/{asset_id}/Contract': PostAssetsPDUByAssetIdContractBody
  'PATCH /Assets/PDU/{asset_id}/Contract/{id}': PatchAssetsPDUByAssetIdContractByIdBody
  'PATCH /Assets/PDU/{id}': PatchAssetsPDUByIdBody
  'PATCH /Assets/PDU/{id}/Infocom': PatchAssetsPDUByIdInfocomBody
  'POST /Assets/PDU/{id}/Infocom': PostAssetsPDUByIdInfocomBody
  'POST /Assets/PassiveDCEquipment': PostAssetsPassiveDCEquipmentBody
  'PATCH /Assets/PassiveDCEquipment/{id}': PatchAssetsPassiveDCEquipmentByIdBody
  'PATCH /Assets/PassiveDCEquipment/{id}/Infocom': PatchAssetsPassiveDCEquipmentByIdInfocomBody
  'POST /Assets/PassiveDCEquipment/{id}/Infocom': PostAssetsPassiveDCEquipmentByIdInfocomBody
  'POST /Assets/Peripheral': PostAssetsPeripheralBody
  'POST /Assets/Peripheral/{asset_id}/Antivirus': PostAssetsPeripheralByAssetIdAntivirusBody
  'PATCH /Assets/Peripheral/{asset_id}/Antivirus/{id}': PatchAssetsPeripheralByAssetIdAntivirusByIdBody
  'POST /Assets/Peripheral/{asset_id}/Appliance': PostAssetsPeripheralByAssetIdApplianceBody
  'POST /Assets/Peripheral/{asset_id}/Certificate': PostAssetsPeripheralByAssetIdCertificateBody
  'PATCH /Assets/Peripheral/{asset_id}/Certificate/{id}': PatchAssetsPeripheralByAssetIdCertificateByIdBody
  'POST /Assets/Peripheral/{asset_id}/Contract': PostAssetsPeripheralByAssetIdContractBody
  'PATCH /Assets/Peripheral/{asset_id}/Contract/{id}': PatchAssetsPeripheralByAssetIdContractByIdBody
  'POST /Assets/Peripheral/{asset_id}/Domain': PostAssetsPeripheralByAssetIdDomainBody
  'PATCH /Assets/Peripheral/{asset_id}/Domain/{id}': PatchAssetsPeripheralByAssetIdDomainByIdBody
  'POST /Assets/Peripheral/{asset_id}/KBArticle': PostAssetsPeripheralByAssetIdKBArticleBody
  'PATCH /Assets/Peripheral/{asset_id}/KBArticle/{id}': PatchAssetsPeripheralByAssetIdKBArticleByIdBody
  'POST /Assets/Peripheral/{asset_id}/Line': PostAssetsPeripheralByAssetIdLineBody
  'PATCH /Assets/Peripheral/{asset_id}/Line/{id}': PatchAssetsPeripheralByAssetIdLineByIdBody
  'POST /Assets/Peripheral/{asset_id}/PeripheralConnection': PostAssetsPeripheralByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Peripheral/{asset_id}/PeripheralConnection/{id}': PatchAssetsPeripheralByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Peripheral/{asset_id}/Project': PostAssetsPeripheralByAssetIdProjectBody
  'PATCH /Assets/Peripheral/{asset_id}/Project/{id}': PatchAssetsPeripheralByAssetIdProjectByIdBody
  'POST /Assets/Peripheral/{asset_id}/RemoteManagement': PostAssetsPeripheralByAssetIdRemoteManagementBody
  'PATCH /Assets/Peripheral/{asset_id}/RemoteManagement/{id}': PatchAssetsPeripheralByAssetIdRemoteManagementByIdBody
  'POST /Assets/Peripheral/{asset_id}/SoftwareInstallation': PostAssetsPeripheralByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Peripheral/{asset_id}/SoftwareInstallation/{id}': PatchAssetsPeripheralByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Peripheral/{asset_id}/VirtualMachine': PostAssetsPeripheralByAssetIdVirtualMachineBody
  'PATCH /Assets/Peripheral/{asset_id}/VirtualMachine/{id}': PatchAssetsPeripheralByAssetIdVirtualMachineByIdBody
  'POST /Assets/Peripheral/{asset_id}/Volume': PostAssetsPeripheralByAssetIdVolumeBody
  'PATCH /Assets/Peripheral/{asset_id}/Volume/{id}': PatchAssetsPeripheralByAssetIdVolumeByIdBody
  'PATCH /Assets/Peripheral/{id}': PatchAssetsPeripheralByIdBody
  'PATCH /Assets/Peripheral/{id}/Infocom': PatchAssetsPeripheralByIdInfocomBody
  'POST /Assets/Peripheral/{id}/Infocom': PostAssetsPeripheralByIdInfocomBody
  'POST /Assets/Phone': PostAssetsPhoneBody
  'POST /Assets/Phone/{asset_id}/Antivirus': PostAssetsPhoneByAssetIdAntivirusBody
  'PATCH /Assets/Phone/{asset_id}/Antivirus/{id}': PatchAssetsPhoneByAssetIdAntivirusByIdBody
  'POST /Assets/Phone/{asset_id}/Appliance': PostAssetsPhoneByAssetIdApplianceBody
  'POST /Assets/Phone/{asset_id}/Certificate': PostAssetsPhoneByAssetIdCertificateBody
  'PATCH /Assets/Phone/{asset_id}/Certificate/{id}': PatchAssetsPhoneByAssetIdCertificateByIdBody
  'POST /Assets/Phone/{asset_id}/Contract': PostAssetsPhoneByAssetIdContractBody
  'PATCH /Assets/Phone/{asset_id}/Contract/{id}': PatchAssetsPhoneByAssetIdContractByIdBody
  'POST /Assets/Phone/{asset_id}/Domain': PostAssetsPhoneByAssetIdDomainBody
  'PATCH /Assets/Phone/{asset_id}/Domain/{id}': PatchAssetsPhoneByAssetIdDomainByIdBody
  'POST /Assets/Phone/{asset_id}/KBArticle': PostAssetsPhoneByAssetIdKBArticleBody
  'PATCH /Assets/Phone/{asset_id}/KBArticle/{id}': PatchAssetsPhoneByAssetIdKBArticleByIdBody
  'POST /Assets/Phone/{asset_id}/Line': PostAssetsPhoneByAssetIdLineBody
  'PATCH /Assets/Phone/{asset_id}/Line/{id}': PatchAssetsPhoneByAssetIdLineByIdBody
  'POST /Assets/Phone/{asset_id}/PeripheralConnection': PostAssetsPhoneByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Phone/{asset_id}/PeripheralConnection/{id}': PatchAssetsPhoneByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Phone/{asset_id}/Project': PostAssetsPhoneByAssetIdProjectBody
  'PATCH /Assets/Phone/{asset_id}/Project/{id}': PatchAssetsPhoneByAssetIdProjectByIdBody
  'POST /Assets/Phone/{asset_id}/RemoteManagement': PostAssetsPhoneByAssetIdRemoteManagementBody
  'PATCH /Assets/Phone/{asset_id}/RemoteManagement/{id}': PatchAssetsPhoneByAssetIdRemoteManagementByIdBody
  'POST /Assets/Phone/{asset_id}/SoftwareInstallation': PostAssetsPhoneByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Phone/{asset_id}/SoftwareInstallation/{id}': PatchAssetsPhoneByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Phone/{asset_id}/VirtualMachine': PostAssetsPhoneByAssetIdVirtualMachineBody
  'PATCH /Assets/Phone/{asset_id}/VirtualMachine/{id}': PatchAssetsPhoneByAssetIdVirtualMachineByIdBody
  'POST /Assets/Phone/{asset_id}/Volume': PostAssetsPhoneByAssetIdVolumeBody
  'PATCH /Assets/Phone/{asset_id}/Volume/{id}': PatchAssetsPhoneByAssetIdVolumeByIdBody
  'PATCH /Assets/Phone/{id}': PatchAssetsPhoneByIdBody
  'PATCH /Assets/Phone/{id}/Infocom': PatchAssetsPhoneByIdInfocomBody
  'POST /Assets/Phone/{id}/Infocom': PostAssetsPhoneByIdInfocomBody
  'POST /Assets/Printer': PostAssetsPrinterBody
  'POST /Assets/Printer/{asset_id}/Antivirus': PostAssetsPrinterByAssetIdAntivirusBody
  'PATCH /Assets/Printer/{asset_id}/Antivirus/{id}': PatchAssetsPrinterByAssetIdAntivirusByIdBody
  'POST /Assets/Printer/{asset_id}/Appliance': PostAssetsPrinterByAssetIdApplianceBody
  'POST /Assets/Printer/{asset_id}/Certificate': PostAssetsPrinterByAssetIdCertificateBody
  'PATCH /Assets/Printer/{asset_id}/Certificate/{id}': PatchAssetsPrinterByAssetIdCertificateByIdBody
  'POST /Assets/Printer/{asset_id}/Contract': PostAssetsPrinterByAssetIdContractBody
  'PATCH /Assets/Printer/{asset_id}/Contract/{id}': PatchAssetsPrinterByAssetIdContractByIdBody
  'POST /Assets/Printer/{asset_id}/Domain': PostAssetsPrinterByAssetIdDomainBody
  'PATCH /Assets/Printer/{asset_id}/Domain/{id}': PatchAssetsPrinterByAssetIdDomainByIdBody
  'POST /Assets/Printer/{asset_id}/KBArticle': PostAssetsPrinterByAssetIdKBArticleBody
  'PATCH /Assets/Printer/{asset_id}/KBArticle/{id}': PatchAssetsPrinterByAssetIdKBArticleByIdBody
  'POST /Assets/Printer/{asset_id}/Line': PostAssetsPrinterByAssetIdLineBody
  'PATCH /Assets/Printer/{asset_id}/Line/{id}': PatchAssetsPrinterByAssetIdLineByIdBody
  'POST /Assets/Printer/{asset_id}/PeripheralConnection': PostAssetsPrinterByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Printer/{asset_id}/PeripheralConnection/{id}': PatchAssetsPrinterByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Printer/{asset_id}/Project': PostAssetsPrinterByAssetIdProjectBody
  'PATCH /Assets/Printer/{asset_id}/Project/{id}': PatchAssetsPrinterByAssetIdProjectByIdBody
  'POST /Assets/Printer/{asset_id}/RemoteManagement': PostAssetsPrinterByAssetIdRemoteManagementBody
  'PATCH /Assets/Printer/{asset_id}/RemoteManagement/{id}': PatchAssetsPrinterByAssetIdRemoteManagementByIdBody
  'POST /Assets/Printer/{asset_id}/SoftwareInstallation': PostAssetsPrinterByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Printer/{asset_id}/SoftwareInstallation/{id}': PatchAssetsPrinterByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Printer/{asset_id}/VirtualMachine': PostAssetsPrinterByAssetIdVirtualMachineBody
  'PATCH /Assets/Printer/{asset_id}/VirtualMachine/{id}': PatchAssetsPrinterByAssetIdVirtualMachineByIdBody
  'POST /Assets/Printer/{asset_id}/Volume': PostAssetsPrinterByAssetIdVolumeBody
  'PATCH /Assets/Printer/{asset_id}/Volume/{id}': PatchAssetsPrinterByAssetIdVolumeByIdBody
  'PATCH /Assets/Printer/{id}': PatchAssetsPrinterByIdBody
  'PATCH /Assets/Printer/{id}/Infocom': PatchAssetsPrinterByIdInfocomBody
  'POST /Assets/Printer/{id}/Infocom': PostAssetsPrinterByIdInfocomBody
  'POST /Assets/Rack': PostAssetsRackBody
  'POST /Assets/Rack/{asset_id}/Contract': PostAssetsRackByAssetIdContractBody
  'PATCH /Assets/Rack/{asset_id}/Contract/{id}': PatchAssetsRackByAssetIdContractByIdBody
  'PATCH /Assets/Rack/{id}': PatchAssetsRackByIdBody
  'PATCH /Assets/Rack/{id}/Infocom': PatchAssetsRackByIdInfocomBody
  'POST /Assets/Rack/{id}/Infocom': PostAssetsRackByIdInfocomBody
  'POST /Assets/Rack/{rack_id}/Item': PostAssetsRackByRackIdItemBody
  'PATCH /Assets/Rack/{rack_id}/Item/{id}': PatchAssetsRackByRackIdItemByIdBody
  'POST /Assets/Socket': PostAssetsSocketBody
  'PATCH /Assets/Socket/{id}': PatchAssetsSocketByIdBody
  'POST /Assets/Software': PostAssetsSoftwareBody
  'POST /Assets/Software/{asset_id}/Contract': PostAssetsSoftwareByAssetIdContractBody
  'PATCH /Assets/Software/{asset_id}/Contract/{id}': PatchAssetsSoftwareByAssetIdContractByIdBody
  'POST /Assets/Software/{asset_id}/Domain': PostAssetsSoftwareByAssetIdDomainBody
  'PATCH /Assets/Software/{asset_id}/Domain/{id}': PatchAssetsSoftwareByAssetIdDomainByIdBody
  'POST /Assets/Software/{asset_id}/KBArticle': PostAssetsSoftwareByAssetIdKBArticleBody
  'PATCH /Assets/Software/{asset_id}/KBArticle/{id}': PatchAssetsSoftwareByAssetIdKBArticleByIdBody
  'POST /Assets/Software/{asset_id}/Project': PostAssetsSoftwareByAssetIdProjectBody
  'PATCH /Assets/Software/{asset_id}/Project/{id}': PatchAssetsSoftwareByAssetIdProjectByIdBody
  'PATCH /Assets/Software/{id}': PatchAssetsSoftwareByIdBody
  'PATCH /Assets/Software/{id}/Infocom': PatchAssetsSoftwareByIdInfocomBody
  'POST /Assets/Software/{id}/Infocom': PostAssetsSoftwareByIdInfocomBody
  'POST /Assets/Software/{software_id}/Version': PostAssetsSoftwareBySoftwareIdVersionBody
  'PATCH /Assets/Software/{software_id}/Version/{id}': PatchAssetsSoftwareBySoftwareIdVersionByIdBody
  'POST /Assets/SoftwareLicense': PostAssetsSoftwareLicenseBody
  'POST /Assets/SoftwareLicense/{asset_id}/Antivirus': PostAssetsSoftwareLicenseByAssetIdAntivirusBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/Antivirus/{id}': PatchAssetsSoftwareLicenseByAssetIdAntivirusByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/Appliance': PostAssetsSoftwareLicenseByAssetIdApplianceBody
  'POST /Assets/SoftwareLicense/{asset_id}/Certificate': PostAssetsSoftwareLicenseByAssetIdCertificateBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/Certificate/{id}': PatchAssetsSoftwareLicenseByAssetIdCertificateByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/Contract': PostAssetsSoftwareLicenseByAssetIdContractBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/Contract/{id}': PatchAssetsSoftwareLicenseByAssetIdContractByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/KBArticle': PostAssetsSoftwareLicenseByAssetIdKBArticleBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/KBArticle/{id}': PatchAssetsSoftwareLicenseByAssetIdKBArticleByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/PeripheralConnection': PostAssetsSoftwareLicenseByAssetIdPeripheralConnectionBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/PeripheralConnection/{id}': PatchAssetsSoftwareLicenseByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/RemoteManagement': PostAssetsSoftwareLicenseByAssetIdRemoteManagementBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/RemoteManagement/{id}': PatchAssetsSoftwareLicenseByAssetIdRemoteManagementByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/SoftwareInstallation': PostAssetsSoftwareLicenseByAssetIdSoftwareInstallationBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/SoftwareInstallation/{id}': PatchAssetsSoftwareLicenseByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/VirtualMachine': PostAssetsSoftwareLicenseByAssetIdVirtualMachineBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/VirtualMachine/{id}': PatchAssetsSoftwareLicenseByAssetIdVirtualMachineByIdBody
  'POST /Assets/SoftwareLicense/{asset_id}/Volume': PostAssetsSoftwareLicenseByAssetIdVolumeBody
  'PATCH /Assets/SoftwareLicense/{asset_id}/Volume/{id}': PatchAssetsSoftwareLicenseByAssetIdVolumeByIdBody
  'PATCH /Assets/SoftwareLicense/{id}': PatchAssetsSoftwareLicenseByIdBody
  'PATCH /Assets/SoftwareLicense/{id}/Infocom': PatchAssetsSoftwareLicenseByIdInfocomBody
  'POST /Assets/SoftwareLicense/{id}/Infocom': PostAssetsSoftwareLicenseByIdInfocomBody
  'POST /Assets/Unmanaged': PostAssetsUnmanagedBody
  'POST /Assets/Unmanaged/{asset_id}/Antivirus': PostAssetsUnmanagedByAssetIdAntivirusBody
  'PATCH /Assets/Unmanaged/{asset_id}/Antivirus/{id}': PatchAssetsUnmanagedByAssetIdAntivirusByIdBody
  'POST /Assets/Unmanaged/{asset_id}/Appliance': PostAssetsUnmanagedByAssetIdApplianceBody
  'POST /Assets/Unmanaged/{asset_id}/Domain': PostAssetsUnmanagedByAssetIdDomainBody
  'PATCH /Assets/Unmanaged/{asset_id}/Domain/{id}': PatchAssetsUnmanagedByAssetIdDomainByIdBody
  'POST /Assets/Unmanaged/{asset_id}/PeripheralConnection': PostAssetsUnmanagedByAssetIdPeripheralConnectionBody
  'PATCH /Assets/Unmanaged/{asset_id}/PeripheralConnection/{id}': PatchAssetsUnmanagedByAssetIdPeripheralConnectionByIdBody
  'POST /Assets/Unmanaged/{asset_id}/RemoteManagement': PostAssetsUnmanagedByAssetIdRemoteManagementBody
  'PATCH /Assets/Unmanaged/{asset_id}/RemoteManagement/{id}': PatchAssetsUnmanagedByAssetIdRemoteManagementByIdBody
  'POST /Assets/Unmanaged/{asset_id}/SoftwareInstallation': PostAssetsUnmanagedByAssetIdSoftwareInstallationBody
  'PATCH /Assets/Unmanaged/{asset_id}/SoftwareInstallation/{id}': PatchAssetsUnmanagedByAssetIdSoftwareInstallationByIdBody
  'POST /Assets/Unmanaged/{asset_id}/VirtualMachine': PostAssetsUnmanagedByAssetIdVirtualMachineBody
  'PATCH /Assets/Unmanaged/{asset_id}/VirtualMachine/{id}': PatchAssetsUnmanagedByAssetIdVirtualMachineByIdBody
  'POST /Assets/Unmanaged/{asset_id}/Volume': PostAssetsUnmanagedByAssetIdVolumeBody
  'PATCH /Assets/Unmanaged/{asset_id}/Volume/{id}': PatchAssetsUnmanagedByAssetIdVolumeByIdBody
  'PATCH /Assets/Unmanaged/{id}': PatchAssetsUnmanagedByIdBody
  'POST /Assets/{asset_itemtype}/{asset_id}/OSInstallation': PostAssetsByAssetItemtypeByAssetIdOSInstallationBody
  'PATCH /Assets/{asset_itemtype}/{asset_id}/OSInstallation/{id}': PatchAssetsByAssetItemtypeByAssetIdOSInstallationByIdBody
  'POST /Assistance/Change': PostAssistanceChangeBody
  'POST /Assistance/Change/{assistance_id}/KBArticle': PostAssistanceChangeByAssistanceIdKBArticleBody
  'PATCH /Assistance/Change/{assistance_id}/KBArticle/{id}': PatchAssistanceChangeByAssistanceIdKBArticleByIdBody
  'PATCH /Assistance/Change/{id}': PatchAssistanceChangeByIdBody
  'POST /Assistance/Change/{id}/Cost': PostAssistanceChangeByIdCostBody
  'PATCH /Assistance/Change/{id}/Cost/{cost_id}': PatchAssistanceChangeByIdCostByCostIdBody
  'POST /Assistance/Change/{id}/Timeline/Document': PostAssistanceChangeByIdTimelineDocumentBody
  'PATCH /Assistance/Change/{id}/Timeline/Document/{subitem_id}': PatchAssistanceChangeByIdTimelineDocumentBySubitemIdBody
  'POST /Assistance/Change/{id}/Timeline/Followup': PostAssistanceChangeByIdTimelineFollowupBody
  'PATCH /Assistance/Change/{id}/Timeline/Followup/{subitem_id}': PatchAssistanceChangeByIdTimelineFollowupBySubitemIdBody
  'POST /Assistance/Change/{id}/Timeline/Solution': PostAssistanceChangeByIdTimelineSolutionBody
  'PATCH /Assistance/Change/{id}/Timeline/Solution/{subitem_id}': PatchAssistanceChangeByIdTimelineSolutionBySubitemIdBody
  'POST /Assistance/Change/{id}/Timeline/Task': PostAssistanceChangeByIdTimelineTaskBody
  'PATCH /Assistance/Change/{id}/Timeline/Task/{subitem_id}': PatchAssistanceChangeByIdTimelineTaskBySubitemIdBody
  'POST /Assistance/Change/{id}/Timeline/Validation': PostAssistanceChangeByIdTimelineValidationBody
  'PATCH /Assistance/Change/{id}/Timeline/Validation/{subitem_id}': PatchAssistanceChangeByIdTimelineValidationBySubitemIdBody
  'POST /Assistance/ExternalEvent': PostAssistanceExternalEventBody
  'PATCH /Assistance/ExternalEvent/{id}': PatchAssistanceExternalEventByIdBody
  'POST /Assistance/PendingReason': PostAssistancePendingReasonBody
  'PATCH /Assistance/PendingReason/{id}': PatchAssistancePendingReasonByIdBody
  'POST /Assistance/Problem': PostAssistanceProblemBody
  'POST /Assistance/Problem/{assistance_id}/KBArticle': PostAssistanceProblemByAssistanceIdKBArticleBody
  'PATCH /Assistance/Problem/{assistance_id}/KBArticle/{id}': PatchAssistanceProblemByAssistanceIdKBArticleByIdBody
  'PATCH /Assistance/Problem/{id}': PatchAssistanceProblemByIdBody
  'POST /Assistance/Problem/{id}/Cost': PostAssistanceProblemByIdCostBody
  'PATCH /Assistance/Problem/{id}/Cost/{cost_id}': PatchAssistanceProblemByIdCostByCostIdBody
  'POST /Assistance/Problem/{id}/Timeline/Document': PostAssistanceProblemByIdTimelineDocumentBody
  'PATCH /Assistance/Problem/{id}/Timeline/Document/{subitem_id}': PatchAssistanceProblemByIdTimelineDocumentBySubitemIdBody
  'POST /Assistance/Problem/{id}/Timeline/Followup': PostAssistanceProblemByIdTimelineFollowupBody
  'PATCH /Assistance/Problem/{id}/Timeline/Followup/{subitem_id}': PatchAssistanceProblemByIdTimelineFollowupBySubitemIdBody
  'POST /Assistance/Problem/{id}/Timeline/Solution': PostAssistanceProblemByIdTimelineSolutionBody
  'PATCH /Assistance/Problem/{id}/Timeline/Solution/{subitem_id}': PatchAssistanceProblemByIdTimelineSolutionBySubitemIdBody
  'POST /Assistance/Problem/{id}/Timeline/Task': PostAssistanceProblemByIdTimelineTaskBody
  'PATCH /Assistance/Problem/{id}/Timeline/Task/{subitem_id}': PatchAssistanceProblemByIdTimelineTaskBySubitemIdBody
  'POST /Assistance/RecurringChange': PostAssistanceRecurringChangeBody
  'PATCH /Assistance/RecurringChange/{id}': PatchAssistanceRecurringChangeByIdBody
  'POST /Assistance/RecurringTicket': PostAssistanceRecurringTicketBody
  'PATCH /Assistance/RecurringTicket/{id}': PatchAssistanceRecurringTicketByIdBody
  'POST /Assistance/Ticket': PostAssistanceTicketBody
  'POST /Assistance/Ticket/{assistance_id}/KBArticle': PostAssistanceTicketByAssistanceIdKBArticleBody
  'PATCH /Assistance/Ticket/{assistance_id}/KBArticle/{id}': PatchAssistanceTicketByAssistanceIdKBArticleByIdBody
  'PATCH /Assistance/Ticket/{id}': PatchAssistanceTicketByIdBody
  'POST /Assistance/Ticket/{id}/Cost': PostAssistanceTicketByIdCostBody
  'PATCH /Assistance/Ticket/{id}/Cost/{cost_id}': PatchAssistanceTicketByIdCostByCostIdBody
  'POST /Assistance/Ticket/{id}/Timeline/Document': PostAssistanceTicketByIdTimelineDocumentBody
  'PATCH /Assistance/Ticket/{id}/Timeline/Document/{subitem_id}': PatchAssistanceTicketByIdTimelineDocumentBySubitemIdBody
  'POST /Assistance/Ticket/{id}/Timeline/Followup': PostAssistanceTicketByIdTimelineFollowupBody
  'PATCH /Assistance/Ticket/{id}/Timeline/Followup/{subitem_id}': PatchAssistanceTicketByIdTimelineFollowupBySubitemIdBody
  'POST /Assistance/Ticket/{id}/Timeline/Solution': PostAssistanceTicketByIdTimelineSolutionBody
  'PATCH /Assistance/Ticket/{id}/Timeline/Solution/{subitem_id}': PatchAssistanceTicketByIdTimelineSolutionBySubitemIdBody
  'POST /Assistance/Ticket/{id}/Timeline/Task': PostAssistanceTicketByIdTimelineTaskBody
  'PATCH /Assistance/Ticket/{id}/Timeline/Task/{subitem_id}': PatchAssistanceTicketByIdTimelineTaskBySubitemIdBody
  'POST /Assistance/Ticket/{id}/Timeline/Validation': PostAssistanceTicketByIdTimelineValidationBody
  'PATCH /Assistance/Ticket/{id}/Timeline/Validation/{subitem_id}': PatchAssistanceTicketByIdTimelineValidationBySubitemIdBody
  'POST /Budget/{items_id}/Note': PostBudgetByItemsIdNoteBody
  'PATCH /Budget/{items_id}/Note/{id}': PatchBudgetByItemsIdNoteByIdBody
  'POST /CartridgeItem/{items_id}/Note': PostCartridgeItemByItemsIdNoteBody
  'PATCH /CartridgeItem/{items_id}/Note/{id}': PatchCartridgeItemByItemsIdNoteByIdBody
  'POST /Certificate/{items_id}/Note': PostCertificateByItemsIdNoteBody
  'PATCH /Certificate/{items_id}/Note/{id}': PatchCertificateByItemsIdNoteByIdBody
  'POST /Change/{items_id}/Note': PostChangeByItemsIdNoteBody
  'PATCH /Change/{items_id}/Note/{id}': PatchChangeByItemsIdNoteByIdBody
  'POST /Cluster/{items_id}/Note': PostClusterByItemsIdNoteBody
  'PATCH /Cluster/{items_id}/Note/{id}': PatchClusterByItemsIdNoteByIdBody
  'POST /Components/Battery': PostComponentsBatteryBody
  'PATCH /Components/Battery/{id}': PatchComponentsBatteryByIdBody
  'POST /Components/Camera': PostComponentsCameraBody
  'PATCH /Components/Camera/{id}': PatchComponentsCameraByIdBody
  'POST /Components/Case': PostComponentsCaseBody
  'PATCH /Components/Case/{id}': PatchComponentsCaseByIdBody
  'POST /Components/Controller': PostComponentsControllerBody
  'PATCH /Components/Controller/{id}': PatchComponentsControllerByIdBody
  'POST /Components/Drive': PostComponentsDriveBody
  'PATCH /Components/Drive/{id}': PatchComponentsDriveByIdBody
  'POST /Components/Firmware': PostComponentsFirmwareBody
  'PATCH /Components/Firmware/{id}': PatchComponentsFirmwareByIdBody
  'POST /Components/GenericDevice': PostComponentsGenericDeviceBody
  'PATCH /Components/GenericDevice/{id}': PatchComponentsGenericDeviceByIdBody
  'POST /Components/GraphicCard': PostComponentsGraphicCardBody
  'PATCH /Components/GraphicCard/{id}': PatchComponentsGraphicCardByIdBody
  'POST /Components/HardDrive': PostComponentsHardDriveBody
  'PATCH /Components/HardDrive/{id}': PatchComponentsHardDriveByIdBody
  'POST /Components/Memory': PostComponentsMemoryBody
  'PATCH /Components/Memory/{id}': PatchComponentsMemoryByIdBody
  'POST /Components/NetworkCard': PostComponentsNetworkCardBody
  'PATCH /Components/NetworkCard/{id}': PatchComponentsNetworkCardByIdBody
  'POST /Components/PCIDevice': PostComponentsPCIDeviceBody
  'PATCH /Components/PCIDevice/{id}': PatchComponentsPCIDeviceByIdBody
  'POST /Components/PowerSupply': PostComponentsPowerSupplyBody
  'PATCH /Components/PowerSupply/{id}': PatchComponentsPowerSupplyByIdBody
  'POST /Components/Processor': PostComponentsProcessorBody
  'PATCH /Components/Processor/{id}': PatchComponentsProcessorByIdBody
  'POST /Components/SIMCard': PostComponentsSIMCardBody
  'PATCH /Components/SIMCard/{id}': PatchComponentsSIMCardByIdBody
  'POST /Components/Sensor': PostComponentsSensorBody
  'PATCH /Components/Sensor/{id}': PatchComponentsSensorByIdBody
  'POST /Components/SoundCard': PostComponentsSoundCardBody
  'PATCH /Components/SoundCard/{id}': PatchComponentsSoundCardByIdBody
  'POST /Components/Systemboard': PostComponentsSystemboardBody
  'PATCH /Components/Systemboard/{id}': PatchComponentsSystemboardByIdBody
  'POST /Computer/{items_id}/Note': PostComputerByItemsIdNoteBody
  'PATCH /Computer/{items_id}/Note/{id}': PatchComputerByItemsIdNoteByIdBody
  'POST /ConsumableItem/{items_id}/Note': PostConsumableItemByItemsIdNoteBody
  'PATCH /ConsumableItem/{items_id}/Note/{id}': PatchConsumableItemByItemsIdNoteByIdBody
  'POST /Contact/{items_id}/Note': PostContactByItemsIdNoteBody
  'PATCH /Contact/{items_id}/Note/{id}': PatchContactByItemsIdNoteByIdBody
  'POST /DCRoom/{items_id}/Note': PostDCRoomByItemsIdNoteBody
  'PATCH /DCRoom/{items_id}/Note/{id}': PatchDCRoomByItemsIdNoteByIdBody
  'POST /Database/{items_id}/Note': PostDatabaseByItemsIdNoteBody
  'PATCH /Database/{items_id}/Note/{id}': PatchDatabaseByItemsIdNoteByIdBody
  'POST /DatabaseInstance/{items_id}/Note': PostDatabaseInstanceByItemsIdNoteBody
  'PATCH /DatabaseInstance/{items_id}/Note/{id}': PatchDatabaseInstanceByItemsIdNoteByIdBody
  'POST /Domain/{items_id}/Note': PostDomainByItemsIdNoteBody
  'PATCH /Domain/{items_id}/Note/{id}': PatchDomainByItemsIdNoteByIdBody
  'POST /DomainRecord/{items_id}/Note': PostDomainRecordByItemsIdNoteBody
  'PATCH /DomainRecord/{items_id}/Note/{id}': PatchDomainRecordByItemsIdNoteByIdBody
  'POST /Dropdowns/ApplianceEnvironment': PostDropdownsApplianceEnvironmentBody
  'PATCH /Dropdowns/ApplianceEnvironment/{id}': PatchDropdownsApplianceEnvironmentByIdBody
  'POST /Dropdowns/ApplianceType': PostDropdownsApplianceTypeBody
  'PATCH /Dropdowns/ApplianceType/{id}': PatchDropdownsApplianceTypeByIdBody
  'POST /Dropdowns/ApprovalStep': PostDropdownsApprovalStepBody
  'PATCH /Dropdowns/ApprovalStep/{id}': PatchDropdownsApprovalStepByIdBody
  'POST /Dropdowns/AutoUpdateSystem': PostDropdownsAutoUpdateSystemBody
  'PATCH /Dropdowns/AutoUpdateSystem/{id}': PatchDropdownsAutoUpdateSystemByIdBody
  'POST /Dropdowns/BudgetType': PostDropdownsBudgetTypeBody
  'PATCH /Dropdowns/BudgetType/{id}': PatchDropdownsBudgetTypeByIdBody
  'POST /Dropdowns/BusinessCriticity': PostDropdownsBusinessCriticityBody
  'PATCH /Dropdowns/BusinessCriticity/{id}': PatchDropdownsBusinessCriticityByIdBody
  'POST /Dropdowns/CableStrand': PostDropdownsCableStrandBody
  'PATCH /Dropdowns/CableStrand/{id}': PatchDropdownsCableStrandByIdBody
  'POST /Dropdowns/CableType': PostDropdownsCableTypeBody
  'PATCH /Dropdowns/CableType/{id}': PatchDropdownsCableTypeByIdBody
  'POST /Dropdowns/Calendar': PostDropdownsCalendarBody
  'PATCH /Dropdowns/Calendar/{id}': PatchDropdownsCalendarByIdBody
  'POST /Dropdowns/CalendarTimeRange': PostDropdownsCalendarTimeRangeBody
  'PATCH /Dropdowns/CalendarTimeRange/{id}': PatchDropdownsCalendarTimeRangeByIdBody
  'POST /Dropdowns/CameraImageFormat': PostDropdownsCameraImageFormatBody
  'PATCH /Dropdowns/CameraImageFormat/{id}': PatchDropdownsCameraImageFormatByIdBody
  'POST /Dropdowns/CameraImageResolution': PostDropdownsCameraImageResolutionBody
  'PATCH /Dropdowns/CameraImageResolution/{id}': PatchDropdownsCameraImageResolutionByIdBody
  'POST /Dropdowns/CartridgeItemType': PostDropdownsCartridgeItemTypeBody
  'PATCH /Dropdowns/CartridgeItemType/{id}': PatchDropdownsCartridgeItemTypeByIdBody
  'POST /Dropdowns/CertificateType': PostDropdownsCertificateTypeBody
  'PATCH /Dropdowns/CertificateType/{id}': PatchDropdownsCertificateTypeByIdBody
  'POST /Dropdowns/CloseTime': PostDropdownsCloseTimeBody
  'PATCH /Dropdowns/CloseTime/{id}': PatchDropdownsCloseTimeByIdBody
  'POST /Dropdowns/ClusterType': PostDropdownsClusterTypeBody
  'PATCH /Dropdowns/ClusterType/{id}': PatchDropdownsClusterTypeByIdBody
  'POST /Dropdowns/ComputerModel': PostDropdownsComputerModelBody
  'PATCH /Dropdowns/ComputerModel/{id}': PatchDropdownsComputerModelByIdBody
  'POST /Dropdowns/ComputerType': PostDropdownsComputerTypeBody
  'PATCH /Dropdowns/ComputerType/{id}': PatchDropdownsComputerTypeByIdBody
  'POST /Dropdowns/ConsumableItemType': PostDropdownsConsumableItemTypeBody
  'PATCH /Dropdowns/ConsumableItemType/{id}': PatchDropdownsConsumableItemTypeByIdBody
  'POST /Dropdowns/ContactType': PostDropdownsContactTypeBody
  'PATCH /Dropdowns/ContactType/{id}': PatchDropdownsContactTypeByIdBody
  'POST /Dropdowns/ContractType': PostDropdownsContractTypeBody
  'PATCH /Dropdowns/ContractType/{id}': PatchDropdownsContractTypeByIdBody
  'POST /Dropdowns/DatabaseInstanceCategory': PostDropdownsDatabaseInstanceCategoryBody
  'PATCH /Dropdowns/DatabaseInstanceCategory/{id}': PatchDropdownsDatabaseInstanceCategoryByIdBody
  'POST /Dropdowns/DatabaseInstanceType': PostDropdownsDatabaseInstanceTypeBody
  'PATCH /Dropdowns/DatabaseInstanceType/{id}': PatchDropdownsDatabaseInstanceTypeByIdBody
  'POST /Dropdowns/DeniedMailContent': PostDropdownsDeniedMailContentBody
  'PATCH /Dropdowns/DeniedMailContent/{id}': PatchDropdownsDeniedMailContentByIdBody
  'POST /Dropdowns/DenyList': PostDropdownsDenyListBody
  'PATCH /Dropdowns/DenyList/{id}': PatchDropdownsDenyListByIdBody
  'POST /Dropdowns/DocumentCategory': PostDropdownsDocumentCategoryBody
  'PATCH /Dropdowns/DocumentCategory/{id}': PatchDropdownsDocumentCategoryByIdBody
  'POST /Dropdowns/DocumentType': PostDropdownsDocumentTypeBody
  'PATCH /Dropdowns/DocumentType/{id}': PatchDropdownsDocumentTypeByIdBody
  'POST /Dropdowns/DomainRecordType': PostDropdownsDomainRecordTypeBody
  'PATCH /Dropdowns/DomainRecordType/{id}': PatchDropdownsDomainRecordTypeByIdBody
  'POST /Dropdowns/DomainRelation': PostDropdownsDomainRelationBody
  'PATCH /Dropdowns/DomainRelation/{id}': PatchDropdownsDomainRelationByIdBody
  'POST /Dropdowns/DomainType': PostDropdownsDomainTypeBody
  'PATCH /Dropdowns/DomainType/{id}': PatchDropdownsDomainTypeByIdBody
  'POST /Dropdowns/EnclosureModel': PostDropdownsEnclosureModelBody
  'PATCH /Dropdowns/EnclosureModel/{id}': PatchDropdownsEnclosureModelByIdBody
  'POST /Dropdowns/EventCategory': PostDropdownsEventCategoryBody
  'PATCH /Dropdowns/EventCategory/{id}': PatchDropdownsEventCategoryByIdBody
  'POST /Dropdowns/Filesystem': PostDropdownsFilesystemBody
  'PATCH /Dropdowns/Filesystem/{id}': PatchDropdownsFilesystemByIdBody
  'POST /Dropdowns/FollowupTemplate': PostDropdownsFollowupTemplateBody
  'PATCH /Dropdowns/FollowupTemplate/{id}': PatchDropdownsFollowupTemplateByIdBody
  'POST /Dropdowns/HardDriveType': PostDropdownsHardDriveTypeBody
  'PATCH /Dropdowns/HardDriveType/{id}': PatchDropdownsHardDriveTypeByIdBody
  'POST /Dropdowns/ITILCategory': PostDropdownsITILCategoryBody
  'PATCH /Dropdowns/ITILCategory/{id}': PatchDropdownsITILCategoryByIdBody
  'POST /Dropdowns/Item_Plug': PostDropdownsItemPlugBody
  'PATCH /Dropdowns/Item_Plug/{id}': PatchDropdownsItemPlugByIdBody
  'POST /Dropdowns/LicenseType': PostDropdownsLicenseTypeBody
  'PATCH /Dropdowns/LicenseType/{id}': PatchDropdownsLicenseTypeByIdBody
  'POST /Dropdowns/LineType': PostDropdownsLineTypeBody
  'PATCH /Dropdowns/LineType/{id}': PatchDropdownsLineTypeByIdBody
  'POST /Dropdowns/Location': PostDropdownsLocationBody
  'PATCH /Dropdowns/Location/{id}': PatchDropdownsLocationByIdBody
  'POST /Dropdowns/Manufacturer': PostDropdownsManufacturerBody
  'PATCH /Dropdowns/Manufacturer/{id}': PatchDropdownsManufacturerByIdBody
  'POST /Dropdowns/MonitorModel': PostDropdownsMonitorModelBody
  'PATCH /Dropdowns/MonitorModel/{id}': PatchDropdownsMonitorModelByIdBody
  'POST /Dropdowns/MonitorType': PostDropdownsMonitorTypeBody
  'PATCH /Dropdowns/MonitorType/{id}': PatchDropdownsMonitorTypeByIdBody
  'POST /Dropdowns/Network': PostDropdownsNetworkBody
  'PATCH /Dropdowns/Network/{id}': PatchDropdownsNetworkByIdBody
  'POST /Dropdowns/NetworkEquipmentModel': PostDropdownsNetworkEquipmentModelBody
  'PATCH /Dropdowns/NetworkEquipmentModel/{id}': PatchDropdownsNetworkEquipmentModelByIdBody
  'POST /Dropdowns/NetworkEquipmentType': PostDropdownsNetworkEquipmentTypeBody
  'PATCH /Dropdowns/NetworkEquipmentType/{id}': PatchDropdownsNetworkEquipmentTypeByIdBody
  'POST /Dropdowns/NetworkPortFiberchannelType': PostDropdownsNetworkPortFiberchannelTypeBody
  'PATCH /Dropdowns/NetworkPortFiberchannelType/{id}': PatchDropdownsNetworkPortFiberchannelTypeByIdBody
  'POST /Dropdowns/NetworkPortType': PostDropdownsNetworkPortTypeBody
  'PATCH /Dropdowns/NetworkPortType/{id}': PatchDropdownsNetworkPortTypeByIdBody
  'POST /Dropdowns/PCIVendor': PostDropdownsPCIVendorBody
  'PATCH /Dropdowns/PCIVendor/{id}': PatchDropdownsPCIVendorByIdBody
  'POST /Dropdowns/PeripheralModel': PostDropdownsPeripheralModelBody
  'PATCH /Dropdowns/PeripheralModel/{id}': PatchDropdownsPeripheralModelByIdBody
  'POST /Dropdowns/PeripheralType': PostDropdownsPeripheralTypeBody
  'PATCH /Dropdowns/PeripheralType/{id}': PatchDropdownsPeripheralTypeByIdBody
  'POST /Dropdowns/PhoneModel': PostDropdownsPhoneModelBody
  'PATCH /Dropdowns/PhoneModel/{id}': PatchDropdownsPhoneModelByIdBody
  'POST /Dropdowns/PhonePowerSupply': PostDropdownsPhonePowerSupplyBody
  'PATCH /Dropdowns/PhonePowerSupply/{id}': PatchDropdownsPhonePowerSupplyByIdBody
  'POST /Dropdowns/PhoneType': PostDropdownsPhoneTypeBody
  'PATCH /Dropdowns/PhoneType/{id}': PatchDropdownsPhoneTypeByIdBody
  'POST /Dropdowns/Plug': PostDropdownsPlugBody
  'PATCH /Dropdowns/Plug/{id}': PatchDropdownsPlugByIdBody
  'POST /Dropdowns/PrinterModel': PostDropdownsPrinterModelBody
  'PATCH /Dropdowns/PrinterModel/{id}': PatchDropdownsPrinterModelByIdBody
  'POST /Dropdowns/PrinterType': PostDropdownsPrinterTypeBody
  'PATCH /Dropdowns/PrinterType/{id}': PatchDropdownsPrinterTypeByIdBody
  'POST /Dropdowns/ProjectTaskType': PostDropdownsProjectTaskTypeBody
  'PATCH /Dropdowns/ProjectTaskType/{id}': PatchDropdownsProjectTaskTypeByIdBody
  'POST /Dropdowns/ProjectType': PostDropdownsProjectTypeBody
  'PATCH /Dropdowns/ProjectType/{id}': PatchDropdownsProjectTypeByIdBody
  'POST /Dropdowns/RequestType': PostDropdownsRequestTypeBody
  'PATCH /Dropdowns/RequestType/{id}': PatchDropdownsRequestTypeByIdBody
  'POST /Dropdowns/SolutionTemplate': PostDropdownsSolutionTemplateBody
  'PATCH /Dropdowns/SolutionTemplate/{id}': PatchDropdownsSolutionTemplateByIdBody
  'POST /Dropdowns/SolutionType': PostDropdownsSolutionTypeBody
  'PATCH /Dropdowns/SolutionType/{id}': PatchDropdownsSolutionTypeByIdBody
  'POST /Dropdowns/State': PostDropdownsStateBody
  'PATCH /Dropdowns/State/{id}': PatchDropdownsStateByIdBody
  'POST /Dropdowns/Stencil': PostDropdownsStencilBody
  'PATCH /Dropdowns/Stencil/{id}': PatchDropdownsStencilByIdBody
  'POST /Dropdowns/SupplierType': PostDropdownsSupplierTypeBody
  'PATCH /Dropdowns/SupplierType/{id}': PatchDropdownsSupplierTypeByIdBody
  'POST /Dropdowns/TaskCategory': PostDropdownsTaskCategoryBody
  'PATCH /Dropdowns/TaskCategory/{id}': PatchDropdownsTaskCategoryByIdBody
  'POST /Dropdowns/TaskTemplate': PostDropdownsTaskTemplateBody
  'PATCH /Dropdowns/TaskTemplate/{id}': PatchDropdownsTaskTemplateByIdBody
  'POST /Dropdowns/USBVendor': PostDropdownsUSBVendorBody
  'PATCH /Dropdowns/USBVendor/{id}': PatchDropdownsUSBVendorByIdBody
  'POST /Dropdowns/ValidationTemplate': PostDropdownsValidationTemplateBody
  'PATCH /Dropdowns/ValidationTemplate/{id}': PatchDropdownsValidationTemplateByIdBody
  'POST /Dropdowns/VirtualMachineModel': PostDropdownsVirtualMachineModelBody
  'PATCH /Dropdowns/VirtualMachineModel/{id}': PatchDropdownsVirtualMachineModelByIdBody
  'POST /Dropdowns/VirtualMachineState': PostDropdownsVirtualMachineStateBody
  'PATCH /Dropdowns/VirtualMachineState/{id}': PatchDropdownsVirtualMachineStateByIdBody
  'POST /Dropdowns/VirtualMachineType': PostDropdownsVirtualMachineTypeBody
  'PATCH /Dropdowns/VirtualMachineType/{id}': PatchDropdownsVirtualMachineTypeByIdBody
  'POST /Dropdowns/WifiNetwork': PostDropdownsWifiNetworkBody
  'PATCH /Dropdowns/WifiNetwork/{id}': PatchDropdownsWifiNetworkByIdBody
  'POST /Enclosure/{items_id}/Note': PostEnclosureByItemsIdNoteBody
  'PATCH /Enclosure/{items_id}/Note/{id}': PatchEnclosureByItemsIdNoteByIdBody
  'POST /Entity/{items_id}/Note': PostEntityByItemsIdNoteBody
  'PATCH /Entity/{items_id}/Note/{id}': PatchEntityByItemsIdNoteByIdBody
  'POST /Group/{items_id}/Note': PostGroupByItemsIdNoteBody
  'PATCH /Group/{items_id}/Note/{id}': PatchGroupByItemsIdNoteByIdBody
  'PATCH /Inventory/Agent/{id}': PatchInventoryAgentByIdBody
  'POST /Inventory/LockedField': PostInventoryLockedFieldBody
  'PATCH /Inventory/LockedField/{id}': PatchInventoryLockedFieldByIdBody
  'POST /Inventory/SNMPCredential': PostInventorySNMPCredentialBody
  'PATCH /Inventory/SNMPCredential/{id}': PatchInventorySNMPCredentialByIdBody
  'POST /Knowledgebase/Article': PostKnowledgebaseArticleBody
  'PATCH /Knowledgebase/Article/{article_id}': PatchKnowledgebaseArticleByArticleIdBody
  'POST /Knowledgebase/Article/{article_id}/Comment': PostKnowledgebaseArticleByArticleIdCommentBody
  'PATCH /Knowledgebase/Article/{article_id}/Comment/{id}': PatchKnowledgebaseArticleByArticleIdCommentByIdBody
  'POST /Knowledgebase/Category': PostKnowledgebaseCategoryBody
  'PATCH /Knowledgebase/Category/{id}': PatchKnowledgebaseCategoryByIdBody
  'POST /Line/{items_id}/Note': PostLineByItemsIdNoteBody
  'PATCH /Line/{items_id}/Note/{id}': PatchLineByItemsIdNoteByIdBody
  'POST /Management/Budget': PostManagementBudgetBody
  'PATCH /Management/Budget/{id}': PatchManagementBudgetByIdBody
  'POST /Management/Budget/{items_id}/KBArticle': PostManagementBudgetByItemsIdKBArticleBody
  'PATCH /Management/Budget/{items_id}/KBArticle/{id}': PatchManagementBudgetByItemsIdKBArticleByIdBody
  'POST /Management/Cluster': PostManagementClusterBody
  'PATCH /Management/Cluster/{id}': PatchManagementClusterByIdBody
  'POST /Management/Cluster/{items_id}/Contract': PostManagementClusterByItemsIdContractBody
  'PATCH /Management/Cluster/{items_id}/Contract/{id}': PatchManagementClusterByItemsIdContractByIdBody
  'POST /Management/Contact': PostManagementContactBody
  'PATCH /Management/Contact/{id}': PatchManagementContactByIdBody
  'POST /Management/Contract': PostManagementContractBody
  'PATCH /Management/Contract/{id}': PatchManagementContractByIdBody
  'POST /Management/Contract/{id}/Cost': PostManagementContractByIdCostBody
  'PATCH /Management/Contract/{id}/Cost/{cost_id}': PatchManagementContractByIdCostByCostIdBody
  'POST /Management/DataCenter': PostManagementDataCenterBody
  'PATCH /Management/DataCenter/{id}': PatchManagementDataCenterByIdBody
  'POST /Management/Database': PostManagementDatabaseBody
  'PATCH /Management/Database/{id}': PatchManagementDatabaseByIdBody
  'POST /Management/Database/{items_id}/Domain': PostManagementDatabaseByItemsIdDomainBody
  'PATCH /Management/Database/{items_id}/Domain/{id}': PatchManagementDatabaseByItemsIdDomainByIdBody
  'POST /Management/DatabaseInstance': PostManagementDatabaseInstanceBody
  'PATCH /Management/DatabaseInstance/{id}': PatchManagementDatabaseInstanceByIdBody
  'POST /Management/DatabaseInstance/{items_id}/Certificate': PostManagementDatabaseInstanceByItemsIdCertificateBody
  'PATCH /Management/DatabaseInstance/{items_id}/Certificate/{id}': PatchManagementDatabaseInstanceByItemsIdCertificateByIdBody
  'POST /Management/DatabaseInstance/{items_id}/Contract': PostManagementDatabaseInstanceByItemsIdContractBody
  'PATCH /Management/DatabaseInstance/{items_id}/Contract/{id}': PatchManagementDatabaseInstanceByItemsIdContractByIdBody
  'POST /Management/DatabaseInstance/{items_id}/Domain': PostManagementDatabaseInstanceByItemsIdDomainBody
  'PATCH /Management/DatabaseInstance/{items_id}/Domain/{id}': PatchManagementDatabaseInstanceByItemsIdDomainByIdBody
  'POST /Management/Document': PostManagementDocumentBody
  'PATCH /Management/Document/{id}': PatchManagementDocumentByIdBody
  'POST /Management/Domain': PostManagementDomainBody
  'PATCH /Management/Domain/{id}': PatchManagementDomainByIdBody
  'POST /Management/Domain/{items_id}/Certificate': PostManagementDomainByItemsIdCertificateBody
  'PATCH /Management/Domain/{items_id}/Certificate/{id}': PatchManagementDomainByItemsIdCertificateByIdBody
  'POST /Management/Domain/{items_id}/Contract': PostManagementDomainByItemsIdContractBody
  'PATCH /Management/Domain/{items_id}/Contract/{id}': PatchManagementDomainByItemsIdContractByIdBody
  'POST /Management/DomainRecord': PostManagementDomainRecordBody
  'PATCH /Management/DomainRecord/{id}': PatchManagementDomainRecordByIdBody
  'POST /Management/License': PostManagementLicenseBody
  'PATCH /Management/License/{id}': PatchManagementLicenseByIdBody
  'POST /Management/Line': PostManagementLineBody
  'PATCH /Management/Line/{id}': PatchManagementLineByIdBody
  'POST /Management/Line/{items_id}/Contract': PostManagementLineByItemsIdContractBody
  'PATCH /Management/Line/{items_id}/Contract/{id}': PatchManagementLineByItemsIdContractByIdBody
  'POST /Management/Supplier': PostManagementSupplierBody
  'PATCH /Management/Supplier/{id}': PatchManagementSupplierByIdBody
  'POST /Monitor/{items_id}/Note': PostMonitorByItemsIdNoteBody
  'PATCH /Monitor/{items_id}/Note/{id}': PatchMonitorByItemsIdNoteByIdBody
  'POST /NetworkEquipment/{items_id}/Note': PostNetworkEquipmentByItemsIdNoteBody
  'PATCH /NetworkEquipment/{items_id}/Note/{id}': PatchNetworkEquipmentByItemsIdNoteByIdBody
  'POST /Notifications/Notification': PostNotificationsNotificationBody
  'PATCH /Notifications/Notification/{id}': PatchNotificationsNotificationByIdBody
  'POST /Notifications/Notification/{notification_id}/Recipient': PostNotificationsNotificationByNotificationIdRecipientBody
  'POST /Notifications/NotificationTemplate': PostNotificationsNotificationTemplateBody
  'PATCH /Notifications/NotificationTemplate/{id}': PatchNotificationsNotificationTemplateByIdBody
  'POST /Notifications/NotificationTemplate/{template_id}/Translation': PostNotificationsNotificationTemplateByTemplateIdTranslationBody
  'PATCH /Notifications/NotificationTemplate/{template_id}/Translation/{id}': PatchNotificationsNotificationTemplateByTemplateIdTranslationByIdBody
  'POST /Peripheral/{items_id}/Note': PostPeripheralByItemsIdNoteBody
  'PATCH /Peripheral/{items_id}/Note/{id}': PatchPeripheralByItemsIdNoteByIdBody
  'POST /Phone/{items_id}/Note': PostPhoneByItemsIdNoteBody
  'PATCH /Phone/{items_id}/Note/{id}': PatchPhoneByItemsIdNoteByIdBody
  'POST /Printer/{items_id}/Note': PostPrinterByItemsIdNoteBody
  'PATCH /Printer/{items_id}/Note/{id}': PatchPrinterByItemsIdNoteByIdBody
  'POST /Problem/{items_id}/Note': PostProblemByItemsIdNoteBody
  'PATCH /Problem/{items_id}/Note/{id}': PatchProblemByItemsIdNoteByIdBody
  'POST /Project/': PostProjectBody
  'POST /Project/Project/{id}/Cost': PostProjectProjectByIdCostBody
  'PATCH /Project/Project/{id}/Cost/{cost_id}': PatchProjectProjectByIdCostByCostIdBody
  'POST /Project/Project/{items_id}/Contract': PostProjectProjectByItemsIdContractBody
  'PATCH /Project/Project/{items_id}/Contract/{id}': PatchProjectProjectByItemsIdContractByIdBody
  'POST /Project/Project/{items_id}/KBArticle': PostProjectProjectByItemsIdKBArticleBody
  'PATCH /Project/Project/{items_id}/KBArticle/{id}': PatchProjectProjectByItemsIdKBArticleByIdBody
  'POST /Project/Task': PostProjectTaskBody
  'PATCH /Project/Task/{id}': PatchProjectTaskByIdBody
  'POST /Project/Task/{task_id}/TeamMember': PostProjectTaskByTaskIdTeamMemberBody
  'PATCH /Project/{id}': PatchProjectByIdBody
  'POST /Project/{items_id}/Note': PostProjectByItemsIdNoteBody
  'PATCH /Project/{items_id}/Note/{id}': PatchProjectByItemsIdNoteByIdBody
  'POST /Project/{project_id}/Change': PostProjectByProjectIdChangeBody
  'POST /Project/{project_id}/Problem': PostProjectByProjectIdProblemBody
  'POST /Project/{project_id}/Task': PostProjectByProjectIdTaskBody
  'POST /Project/{project_id}/TeamMember': PostProjectByProjectIdTeamMemberBody
  'POST /Project/{project_id}/Ticket': PostProjectByProjectIdTicketBody
  'POST /ProjectTask/{items_id}/Note': PostProjectTaskByItemsIdNoteBody
  'PATCH /ProjectTask/{items_id}/Note/{id}': PatchProjectTaskByItemsIdNoteByIdBody
  'POST /Rack/{items_id}/Note': PostRackByItemsIdNoteBody
  'PATCH /Rack/{items_id}/Note/{id}': PatchRackByItemsIdNoteByIdBody
  'POST /Rule/Collection/Asset/Rule': PostRuleCollectionAssetRuleBody
  'PATCH /Rule/Collection/Asset/Rule/{id}': PatchRuleCollectionAssetRuleByIdBody
  'POST /Rule/Collection/Asset/Rule/{rule_id}/Action': PostRuleCollectionAssetRuleByRuleIdActionBody
  'PATCH /Rule/Collection/Asset/Rule/{rule_id}/Action/{id}': PatchRuleCollectionAssetRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/Asset/Rule/{rule_id}/Criteria': PostRuleCollectionAssetRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/Asset/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionAssetRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/Change/Rule': PostRuleCollectionChangeRuleBody
  'PATCH /Rule/Collection/Change/Rule/{id}': PatchRuleCollectionChangeRuleByIdBody
  'POST /Rule/Collection/Change/Rule/{rule_id}/Action': PostRuleCollectionChangeRuleByRuleIdActionBody
  'PATCH /Rule/Collection/Change/Rule/{rule_id}/Action/{id}': PatchRuleCollectionChangeRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/Change/Rule/{rule_id}/Criteria': PostRuleCollectionChangeRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/Change/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionChangeRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/DefineItemtype/Rule': PostRuleCollectionDefineItemtypeRuleBody
  'PATCH /Rule/Collection/DefineItemtype/Rule/{id}': PatchRuleCollectionDefineItemtypeRuleByIdBody
  'POST /Rule/Collection/DefineItemtype/Rule/{rule_id}/Action': PostRuleCollectionDefineItemtypeRuleByRuleIdActionBody
  'PATCH /Rule/Collection/DefineItemtype/Rule/{rule_id}/Action/{id}': PatchRuleCollectionDefineItemtypeRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/DefineItemtype/Rule/{rule_id}/Criteria': PostRuleCollectionDefineItemtypeRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/DefineItemtype/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionDefineItemtypeRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/ImportAsset/Rule': PostRuleCollectionImportAssetRuleBody
  'PATCH /Rule/Collection/ImportAsset/Rule/{id}': PatchRuleCollectionImportAssetRuleByIdBody
  'POST /Rule/Collection/ImportAsset/Rule/{rule_id}/Action': PostRuleCollectionImportAssetRuleByRuleIdActionBody
  'PATCH /Rule/Collection/ImportAsset/Rule/{rule_id}/Action/{id}': PatchRuleCollectionImportAssetRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/ImportAsset/Rule/{rule_id}/Criteria': PostRuleCollectionImportAssetRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/ImportAsset/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionImportAssetRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/ImportEntity/Rule': PostRuleCollectionImportEntityRuleBody
  'PATCH /Rule/Collection/ImportEntity/Rule/{id}': PatchRuleCollectionImportEntityRuleByIdBody
  'POST /Rule/Collection/ImportEntity/Rule/{rule_id}/Action': PostRuleCollectionImportEntityRuleByRuleIdActionBody
  'PATCH /Rule/Collection/ImportEntity/Rule/{rule_id}/Action/{id}': PatchRuleCollectionImportEntityRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/ImportEntity/Rule/{rule_id}/Criteria': PostRuleCollectionImportEntityRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/ImportEntity/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionImportEntityRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/Location/Rule': PostRuleCollectionLocationRuleBody
  'PATCH /Rule/Collection/Location/Rule/{id}': PatchRuleCollectionLocationRuleByIdBody
  'POST /Rule/Collection/Location/Rule/{rule_id}/Action': PostRuleCollectionLocationRuleByRuleIdActionBody
  'PATCH /Rule/Collection/Location/Rule/{rule_id}/Action/{id}': PatchRuleCollectionLocationRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/Location/Rule/{rule_id}/Criteria': PostRuleCollectionLocationRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/Location/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionLocationRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/MailCollector/Rule': PostRuleCollectionMailCollectorRuleBody
  'PATCH /Rule/Collection/MailCollector/Rule/{id}': PatchRuleCollectionMailCollectorRuleByIdBody
  'POST /Rule/Collection/MailCollector/Rule/{rule_id}/Action': PostRuleCollectionMailCollectorRuleByRuleIdActionBody
  'PATCH /Rule/Collection/MailCollector/Rule/{rule_id}/Action/{id}': PatchRuleCollectionMailCollectorRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/MailCollector/Rule/{rule_id}/Criteria': PostRuleCollectionMailCollectorRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/MailCollector/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionMailCollectorRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/Problem/Rule': PostRuleCollectionProblemRuleBody
  'PATCH /Rule/Collection/Problem/Rule/{id}': PatchRuleCollectionProblemRuleByIdBody
  'POST /Rule/Collection/Problem/Rule/{rule_id}/Action': PostRuleCollectionProblemRuleByRuleIdActionBody
  'PATCH /Rule/Collection/Problem/Rule/{rule_id}/Action/{id}': PatchRuleCollectionProblemRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/Problem/Rule/{rule_id}/Criteria': PostRuleCollectionProblemRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/Problem/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionProblemRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/Right/Rule': PostRuleCollectionRightRuleBody
  'PATCH /Rule/Collection/Right/Rule/{id}': PatchRuleCollectionRightRuleByIdBody
  'POST /Rule/Collection/Right/Rule/{rule_id}/Action': PostRuleCollectionRightRuleByRuleIdActionBody
  'PATCH /Rule/Collection/Right/Rule/{rule_id}/Action/{id}': PatchRuleCollectionRightRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/Right/Rule/{rule_id}/Criteria': PostRuleCollectionRightRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/Right/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionRightRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/SoftwareCategory/Rule': PostRuleCollectionSoftwareCategoryRuleBody
  'PATCH /Rule/Collection/SoftwareCategory/Rule/{id}': PatchRuleCollectionSoftwareCategoryRuleByIdBody
  'POST /Rule/Collection/SoftwareCategory/Rule/{rule_id}/Action': PostRuleCollectionSoftwareCategoryRuleByRuleIdActionBody
  'PATCH /Rule/Collection/SoftwareCategory/Rule/{rule_id}/Action/{id}': PatchRuleCollectionSoftwareCategoryRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/SoftwareCategory/Rule/{rule_id}/Criteria': PostRuleCollectionSoftwareCategoryRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/SoftwareCategory/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionSoftwareCategoryRuleByRuleIdCriteriaByIdBody
  'POST /Rule/Collection/Ticket/Rule': PostRuleCollectionTicketRuleBody
  'PATCH /Rule/Collection/Ticket/Rule/{id}': PatchRuleCollectionTicketRuleByIdBody
  'POST /Rule/Collection/Ticket/Rule/{rule_id}/Action': PostRuleCollectionTicketRuleByRuleIdActionBody
  'PATCH /Rule/Collection/Ticket/Rule/{rule_id}/Action/{id}': PatchRuleCollectionTicketRuleByRuleIdActionByIdBody
  'POST /Rule/Collection/Ticket/Rule/{rule_id}/Criteria': PostRuleCollectionTicketRuleByRuleIdCriteriaBody
  'PATCH /Rule/Collection/Ticket/Rule/{rule_id}/Criteria/{id}': PatchRuleCollectionTicketRuleByRuleIdCriteriaByIdBody
  'PATCH /Setup/AutomaticAction/{id}': PatchSetupAutomaticActionByIdBody
  'PATCH /Setup/Config/{context}/{name}': PatchSetupConfigByContextByNameBody
  'POST /Setup/EmailAuthServer': PostSetupEmailAuthServerBody
  'PATCH /Setup/EmailAuthServer/{id}': PatchSetupEmailAuthServerByIdBody
  'POST /Setup/EmailCollector': PostSetupEmailCollectorBody
  'PATCH /Setup/EmailCollector/{id}': PatchSetupEmailCollectorByIdBody
  'POST /Setup/ExternalLink': PostSetupExternalLinkBody
  'PATCH /Setup/ExternalLink/{id}': PatchSetupExternalLinkByIdBody
  'POST /Setup/FieldUnicity': PostSetupFieldUnicityBody
  'PATCH /Setup/FieldUnicity/{id}': PatchSetupFieldUnicityByIdBody
  'POST /Setup/LDAPDirectory': PostSetupLDAPDirectoryBody
  'PATCH /Setup/LDAPDirectory/{id}': PatchSetupLDAPDirectoryByIdBody
  'POST /Setup/LDAPDirectoryReplicate': PostSetupLDAPDirectoryReplicateBody
  'PATCH /Setup/LDAPDirectoryReplicate/{id}': PatchSetupLDAPDirectoryReplicateByIdBody
  'POST /Setup/ManualLink': PostSetupManualLinkBody
  'PATCH /Setup/ManualLink/{id}': PatchSetupManualLinkByIdBody
  'POST /Setup/OAuthClient': PostSetupOAuthClientBody
  'PATCH /Setup/OAuthClient/{id}': PatchSetupOAuthClientByIdBody
  'POST /Setup/OLA': PostSetupOLABody
  'PATCH /Setup/OLA/{id}': PatchSetupOLAByIdBody
  'POST /Setup/OLALevel': PostSetupOLALevelBody
  'PATCH /Setup/OLALevel/{id}': PatchSetupOLALevelByIdBody
  'POST /Setup/QueuedWebhook': PostSetupQueuedWebhookBody
  'PATCH /Setup/QueuedWebhook/{id}': PatchSetupQueuedWebhookByIdBody
  'POST /Setup/SLA': PostSetupSLABody
  'PATCH /Setup/SLA/{id}': PatchSetupSLAByIdBody
  'POST /Setup/SLALevel': PostSetupSLALevelBody
  'PATCH /Setup/SLALevel/{id}': PatchSetupSLALevelByIdBody
  'POST /Setup/SLM': PostSetupSLMBody
  'PATCH /Setup/SLM/{id}': PatchSetupSLMByIdBody
  'POST /Setup/Webhook': PostSetupWebhookBody
  'PATCH /Setup/Webhook/{id}': PatchSetupWebhookByIdBody
  'POST /Setup/WebhookCategory': PostSetupWebhookCategoryBody
  'PATCH /Setup/WebhookCategory/{id}': PatchSetupWebhookCategoryByIdBody
  'POST /Software/{items_id}/Note': PostSoftwareByItemsIdNoteBody
  'PATCH /Software/{items_id}/Note/{id}': PatchSoftwareByItemsIdNoteByIdBody
  'POST /SoftwareLicense/{items_id}/Note': PostSoftwareLicenseByItemsIdNoteBody
  'PATCH /SoftwareLicense/{items_id}/Note/{id}': PatchSoftwareLicenseByItemsIdNoteByIdBody
  'POST /Supplier/{items_id}/Note': PostSupplierByItemsIdNoteBody
  'PATCH /Supplier/{items_id}/Note/{id}': PatchSupplierByItemsIdNoteByIdBody
  'POST /Tools/RSSFeed': PostToolsRSSFeedBody
  'PATCH /Tools/RSSFeed/{id}': PatchToolsRSSFeedByIdBody
  'POST /Tools/Reminder': PostToolsReminderBody
  'PATCH /Tools/Reminder/{id}': PatchToolsReminderByIdBody
}

export type PostAdministrationApprovalSubstituteBody = Schemas.ApprovalSubstituteInput
export type PostAdministrationEntityBody = Schemas.EntityInput
export type PatchAdministrationEntityByIdBody = Schemas.EntityInput
export type PostAdministrationEntityByItemsIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAdministrationEntityByItemsIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAdministrationGroupBody = Schemas.GroupInput
export type PatchAdministrationGroupByIdBody = Schemas.GroupInput
export type PostAdministrationProfileBody = Schemas.ProfileInput
export type PatchAdministrationProfileByIdBody = Schemas.ProfileInput
export type PostAdministrationUserBody = Schemas.UserInput
export type PatchAdministrationUserMePreferenceBody = Schemas.UserPreferencesInput
export type PatchAdministrationUserUsernameByUsernameBody = Schemas.UserInput
export type PatchAdministrationUserByIdBody = Schemas.UserInput
export type PatchAdministrationUserByIdPreferenceBody = Schemas.UserPreferencesInput
export type PatchAdministrationUserByUsernamePreferenceBody = Schemas.UserPreferencesInput
export type PostAdministrationUserByUsersIdCertificateBody = Schemas.CertificateItemInput
export type PatchAdministrationUserByUsersIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAdministrationUserCategoryBody = Schemas.UserCategoryInput
export type PatchAdministrationUserCategoryByIdBody = Schemas.UserCategoryInput
export type PostAdministrationUserTitleBody = Schemas.UserTitleInput
export type PatchAdministrationUserTitleByIdBody = Schemas.UserTitleInput
export type PostApplianceByItemsIdNoteBody = Schemas.NoteInput
export type PatchApplianceByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostAssetsApplianceBody = Schemas.ApplianceInput
export type PostAssetsApplianceByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsApplianceByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsApplianceByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsApplianceByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsApplianceByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsApplianceByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsApplianceByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsApplianceByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsApplianceByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsApplianceByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsApplianceByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsApplianceByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsApplianceByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsApplianceByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsApplianceByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsApplianceByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsApplianceByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsApplianceByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsApplianceByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsApplianceByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsApplianceByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsApplianceByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsApplianceByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsApplianceByIdBody = Schemas.ApplianceInput
export type PatchAssetsApplianceByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsApplianceByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCableBody = Schemas.CableInput
export type PatchAssetsCableByIdBody = Schemas.CableInput
export type PatchAssetsCableByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCableByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCartridgeBody = Schemas.CartridgeItemInput
export type PostAssetsCartridgeByCartridgeitemsIdBody = Schemas.CartridgeInput
export type PatchAssetsCartridgeByCartridgeitemsIdByIdBody = Schemas.CartridgeInput
export type PatchAssetsCartridgeByIdBody = Schemas.CartridgeItemInput
export type PatchAssetsCartridgeByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCartridgeByIdInfocomBody = Schemas.InfocomInput
export type PatchAssetsCartridgeItemByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCartridgeItemByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCertificateBody = Schemas.CertificateInput
export type PostAssetsCertificateByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsCertificateByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsCertificateByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsCertificateByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsCertificateByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsCertificateByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsCertificateByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsCertificateByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsCertificateByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsCertificateByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsCertificateByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsCertificateByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsCertificateByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsCertificateByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsCertificateByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsCertificateByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsCertificateByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsCertificateByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsCertificateByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsCertificateByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsCertificateByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsCertificateByIdBody = Schemas.CertificateInput
export type PatchAssetsCertificateByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsCertificateByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsComputerBody = Schemas.ComputerInput
export type PostAssetsComputerByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsComputerByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsComputerByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsComputerByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsComputerByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsComputerByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsComputerByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsComputerByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsComputerByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsComputerByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsComputerByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsComputerByAssetIdLineBody = Schemas.ItemLineInput
export type PatchAssetsComputerByAssetIdLineByIdBody = Schemas.ItemLineInput
export type PostAssetsComputerByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsComputerByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsComputerByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsComputerByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsComputerByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsComputerByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsComputerByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsComputerByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsComputerByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsComputerByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsComputerByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsComputerByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsComputerByIdBody = Schemas.ComputerInput
export type PatchAssetsComputerByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsComputerByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsConsumableBody = Schemas.ConsumableItemInput
export type PostAssetsConsumableByConsumableitemsIdBody = Schemas.ConsumableInput
export type PatchAssetsConsumableByConsumableitemsIdByIdBody = Schemas.ConsumableInput
export type PatchAssetsConsumableByIdBody = Schemas.ConsumableItemInput
export type PatchAssetsConsumableByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsConsumableByIdInfocomBody = Schemas.InfocomInput
export type PatchAssetsConsumableItemByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsConsumableItemByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsDCRoomByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsDCRoomByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsEnclosureBody = Schemas.EnclosureInput
export type PostAssetsEnclosureByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsEnclosureByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PatchAssetsEnclosureByIdBody = Schemas.EnclosureInput
export type PatchAssetsEnclosureByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsEnclosureByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsMonitorBody = Schemas.MonitorInput
export type PostAssetsMonitorByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsMonitorByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsMonitorByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsMonitorByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsMonitorByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsMonitorByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsMonitorByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsMonitorByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsMonitorByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsMonitorByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsMonitorByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsMonitorByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsMonitorByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsMonitorByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsMonitorByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsMonitorByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsMonitorByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsMonitorByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsMonitorByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsMonitorByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsMonitorByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsMonitorByIdBody = Schemas.MonitorInput
export type PatchAssetsMonitorByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsMonitorByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsNetworkEquipmentBody = Schemas.NetworkEquipmentInput
export type PostAssetsNetworkEquipmentByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsNetworkEquipmentByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsNetworkEquipmentByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsNetworkEquipmentByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsNetworkEquipmentByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsNetworkEquipmentByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsNetworkEquipmentByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsNetworkEquipmentByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsNetworkEquipmentByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsNetworkEquipmentByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsNetworkEquipmentByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsNetworkEquipmentByAssetIdLineBody = Schemas.ItemLineInput
export type PatchAssetsNetworkEquipmentByAssetIdLineByIdBody = Schemas.ItemLineInput
export type PostAssetsNetworkEquipmentByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsNetworkEquipmentByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsNetworkEquipmentByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsNetworkEquipmentByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsNetworkEquipmentByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsNetworkEquipmentByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsNetworkEquipmentByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsNetworkEquipmentByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsNetworkEquipmentByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsNetworkEquipmentByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsNetworkEquipmentByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsNetworkEquipmentByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsNetworkEquipmentByIdBody = Schemas.NetworkEquipmentInput
export type PatchAssetsNetworkEquipmentByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsNetworkEquipmentByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPDUBody = Schemas.PDUInput
export type PostAssetsPDUByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsPDUByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PatchAssetsPDUByIdBody = Schemas.PDUInput
export type PatchAssetsPDUByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPDUByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPassiveDCEquipmentBody = Schemas.PassiveDCEquipmentInput
export type PatchAssetsPassiveDCEquipmentByIdBody = Schemas.PassiveDCEquipmentInput
export type PatchAssetsPassiveDCEquipmentByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPassiveDCEquipmentByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPeripheralBody = Schemas.PeripheralInput
export type PostAssetsPeripheralByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsPeripheralByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsPeripheralByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsPeripheralByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsPeripheralByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsPeripheralByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsPeripheralByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsPeripheralByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsPeripheralByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsPeripheralByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsPeripheralByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsPeripheralByAssetIdLineBody = Schemas.ItemLineInput
export type PatchAssetsPeripheralByAssetIdLineByIdBody = Schemas.ItemLineInput
export type PostAssetsPeripheralByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsPeripheralByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsPeripheralByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsPeripheralByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsPeripheralByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsPeripheralByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsPeripheralByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsPeripheralByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsPeripheralByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsPeripheralByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsPeripheralByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsPeripheralByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsPeripheralByIdBody = Schemas.PeripheralInput
export type PatchAssetsPeripheralByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPeripheralByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPhoneBody = Schemas.PhoneInput
export type PostAssetsPhoneByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsPhoneByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsPhoneByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsPhoneByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsPhoneByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsPhoneByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsPhoneByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsPhoneByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsPhoneByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsPhoneByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsPhoneByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsPhoneByAssetIdLineBody = Schemas.ItemLineInput
export type PatchAssetsPhoneByAssetIdLineByIdBody = Schemas.ItemLineInput
export type PostAssetsPhoneByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsPhoneByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsPhoneByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsPhoneByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsPhoneByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsPhoneByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsPhoneByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsPhoneByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsPhoneByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsPhoneByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsPhoneByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsPhoneByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsPhoneByIdBody = Schemas.PhoneInput
export type PatchAssetsPhoneByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPhoneByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPrinterBody = Schemas.PrinterInput
export type PostAssetsPrinterByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsPrinterByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsPrinterByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsPrinterByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsPrinterByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsPrinterByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsPrinterByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsPrinterByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsPrinterByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsPrinterByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsPrinterByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsPrinterByAssetIdLineBody = Schemas.ItemLineInput
export type PatchAssetsPrinterByAssetIdLineByIdBody = Schemas.ItemLineInput
export type PostAssetsPrinterByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsPrinterByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsPrinterByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsPrinterByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PostAssetsPrinterByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsPrinterByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsPrinterByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsPrinterByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsPrinterByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsPrinterByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsPrinterByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsPrinterByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsPrinterByIdBody = Schemas.PrinterInput
export type PatchAssetsPrinterByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsPrinterByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsRackBody = Schemas.RackInput
export type PostAssetsRackByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsRackByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PatchAssetsRackByIdBody = Schemas.RackInput
export type PatchAssetsRackByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsRackByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsRackByRackIdItemBody = Schemas.RackItemInput
export type PatchAssetsRackByRackIdItemByIdBody = Schemas.RackItemInput
export type PostAssetsSocketBody = Schemas.SocketInput
export type PatchAssetsSocketByIdBody = Schemas.SocketInput
export type PostAssetsSoftwareBody = Schemas.SoftwareInput
export type PostAssetsSoftwareByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsSoftwareByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsSoftwareByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsSoftwareByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsSoftwareByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsSoftwareByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsSoftwareByAssetIdProjectBody = Schemas.ItemProjectInput
export type PatchAssetsSoftwareByAssetIdProjectByIdBody = Schemas.ItemProjectInput
export type PatchAssetsSoftwareByIdBody = Schemas.SoftwareInput
export type PatchAssetsSoftwareByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsSoftwareByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsSoftwareBySoftwareIdVersionBody = Schemas.SoftwareVersionInput
export type PatchAssetsSoftwareBySoftwareIdVersionByIdBody = Schemas.SoftwareVersionInput
export type PostAssetsSoftwareLicenseBody = Schemas.SoftwareLicenseInput
export type PostAssetsSoftwareLicenseByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsSoftwareLicenseByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsSoftwareLicenseByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsSoftwareLicenseByAssetIdCertificateBody = Schemas.CertificateItemInput
export type PatchAssetsSoftwareLicenseByAssetIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostAssetsSoftwareLicenseByAssetIdContractBody = Schemas.ContractItemInput
export type PatchAssetsSoftwareLicenseByAssetIdContractByIdBody = Schemas.ContractItemInput
export type PostAssetsSoftwareLicenseByAssetIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssetsSoftwareLicenseByAssetIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostAssetsSoftwareLicenseByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsSoftwareLicenseByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsSoftwareLicenseByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsSoftwareLicenseByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsSoftwareLicenseByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsSoftwareLicenseByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsSoftwareLicenseByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsSoftwareLicenseByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsSoftwareLicenseByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsSoftwareLicenseByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsSoftwareLicenseByIdBody = Schemas.SoftwareLicenseInput
export type PatchAssetsSoftwareLicenseByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsSoftwareLicenseByIdInfocomBody = Schemas.InfocomInput
export type PostAssetsUnmanagedBody = Schemas.UnmanagedInput
export type PostAssetsUnmanagedByAssetIdAntivirusBody = Schemas.AntivirusInput
export type PatchAssetsUnmanagedByAssetIdAntivirusByIdBody = Schemas.AntivirusInput
export type PostAssetsUnmanagedByAssetIdApplianceBody = Schemas.ApplianceItemInput
export type PostAssetsUnmanagedByAssetIdDomainBody = Schemas.DomainItemInput
export type PatchAssetsUnmanagedByAssetIdDomainByIdBody = Schemas.DomainItemInput
export type PostAssetsUnmanagedByAssetIdPeripheralConnectionBody = Schemas.PeripheralConnectionInput
export type PatchAssetsUnmanagedByAssetIdPeripheralConnectionByIdBody = Schemas.PeripheralConnectionInput
export type PostAssetsUnmanagedByAssetIdRemoteManagementBody = Schemas.RemoteManagementInput
export type PatchAssetsUnmanagedByAssetIdRemoteManagementByIdBody = Schemas.RemoteManagementInput
export type PostAssetsUnmanagedByAssetIdSoftwareInstallationBody = Schemas.SoftwareInstallationInput
export type PatchAssetsUnmanagedByAssetIdSoftwareInstallationByIdBody = Schemas.SoftwareInstallationInput
export type PostAssetsUnmanagedByAssetIdVirtualMachineBody = Schemas.VirtualMachineInput
export type PatchAssetsUnmanagedByAssetIdVirtualMachineByIdBody = Schemas.VirtualMachineInput
export type PostAssetsUnmanagedByAssetIdVolumeBody = Schemas.VolumeInput
export type PatchAssetsUnmanagedByAssetIdVolumeByIdBody = Schemas.VolumeInput
export type PatchAssetsUnmanagedByIdBody = Schemas.UnmanagedInput
export type PostAssetsByAssetItemtypeByAssetIdOSInstallationBody = Schemas.OSInstallationInput
export type PatchAssetsByAssetItemtypeByAssetIdOSInstallationByIdBody = Schemas.OSInstallationInput
export type PostAssistanceChangeBody = Schemas.ChangeInput
export type PostAssistanceChangeByAssistanceIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssistanceChangeByAssistanceIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PatchAssistanceChangeByIdBody = Schemas.ChangeInput
export type PostAssistanceChangeByIdCostBody = Schemas.ChangeCostInput
export type PatchAssistanceChangeByIdCostByCostIdBody = Schemas.ChangeCostInput
export type PostAssistanceChangeByIdTimelineDocumentBody = Schemas.DocumentInput
export type PatchAssistanceChangeByIdTimelineDocumentBySubitemIdBody = Schemas.DocumentInput
export type PostAssistanceChangeByIdTimelineFollowupBody = Schemas.FollowupInput
export type PatchAssistanceChangeByIdTimelineFollowupBySubitemIdBody = Schemas.FollowupInput
export type PostAssistanceChangeByIdTimelineSolutionBody = Schemas.SolutionInput
export type PatchAssistanceChangeByIdTimelineSolutionBySubitemIdBody = Schemas.SolutionInput
export type PostAssistanceChangeByIdTimelineTaskBody = Schemas.ChangeTaskInput
export type PatchAssistanceChangeByIdTimelineTaskBySubitemIdBody = Schemas.ChangeTaskInput
export type PostAssistanceChangeByIdTimelineValidationBody = Schemas.ChangeValidationInput
export type PatchAssistanceChangeByIdTimelineValidationBySubitemIdBody = Schemas.ChangeValidationInput
export type PostAssistanceExternalEventBody = Schemas.ExternalEventInput
export type PatchAssistanceExternalEventByIdBody = Schemas.ExternalEventInput
export type PostAssistancePendingReasonBody = Schemas.PendingReasonInput
export type PatchAssistancePendingReasonByIdBody = Schemas.PendingReasonInput
export type PostAssistanceProblemBody = Schemas.ProblemInput
export type PostAssistanceProblemByAssistanceIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssistanceProblemByAssistanceIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PatchAssistanceProblemByIdBody = Schemas.ProblemInput
export type PostAssistanceProblemByIdCostBody = Schemas.ProblemCostInput
export type PatchAssistanceProblemByIdCostByCostIdBody = Schemas.ProblemCostInput
export type PostAssistanceProblemByIdTimelineDocumentBody = Schemas.DocumentInput
export type PatchAssistanceProblemByIdTimelineDocumentBySubitemIdBody = Schemas.DocumentInput
export type PostAssistanceProblemByIdTimelineFollowupBody = Schemas.FollowupInput
export type PatchAssistanceProblemByIdTimelineFollowupBySubitemIdBody = Schemas.FollowupInput
export type PostAssistanceProblemByIdTimelineSolutionBody = Schemas.SolutionInput
export type PatchAssistanceProblemByIdTimelineSolutionBySubitemIdBody = Schemas.SolutionInput
export type PostAssistanceProblemByIdTimelineTaskBody = Schemas.ProblemTaskInput
export type PatchAssistanceProblemByIdTimelineTaskBySubitemIdBody = Schemas.ProblemTaskInput
export type PostAssistanceRecurringChangeBody = Schemas.RecurringChangeInput
export type PatchAssistanceRecurringChangeByIdBody = Schemas.RecurringChangeInput
export type PostAssistanceRecurringTicketBody = Schemas.RecurringTicketInput
export type PatchAssistanceRecurringTicketByIdBody = Schemas.RecurringTicketInput
export type PostAssistanceTicketBody = Schemas.TicketInput
export type PostAssistanceTicketByAssistanceIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchAssistanceTicketByAssistanceIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PatchAssistanceTicketByIdBody = Schemas.TicketInput
export type PostAssistanceTicketByIdCostBody = Schemas.TicketCostInput
export type PatchAssistanceTicketByIdCostByCostIdBody = Schemas.TicketCostInput
export type PostAssistanceTicketByIdTimelineDocumentBody = Schemas.DocumentInput
export type PatchAssistanceTicketByIdTimelineDocumentBySubitemIdBody = Schemas.DocumentInput
export type PostAssistanceTicketByIdTimelineFollowupBody = Schemas.FollowupInput
export type PatchAssistanceTicketByIdTimelineFollowupBySubitemIdBody = Schemas.FollowupInput
export type PostAssistanceTicketByIdTimelineSolutionBody = Schemas.SolutionInput
export type PatchAssistanceTicketByIdTimelineSolutionBySubitemIdBody = Schemas.SolutionInput
export type PostAssistanceTicketByIdTimelineTaskBody = Schemas.TicketTaskInput
export type PatchAssistanceTicketByIdTimelineTaskBySubitemIdBody = Schemas.TicketTaskInput
export type PostAssistanceTicketByIdTimelineValidationBody = Schemas.TicketValidationInput
export type PatchAssistanceTicketByIdTimelineValidationBySubitemIdBody = Schemas.TicketValidationInput
export type PostBudgetByItemsIdNoteBody = Schemas.NoteInput
export type PatchBudgetByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostCartridgeItemByItemsIdNoteBody = Schemas.NoteInput
export type PatchCartridgeItemByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostCertificateByItemsIdNoteBody = Schemas.NoteInput
export type PatchCertificateByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostChangeByItemsIdNoteBody = Schemas.NoteInput
export type PatchChangeByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostClusterByItemsIdNoteBody = Schemas.NoteInput
export type PatchClusterByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostComponentsBatteryBody = Schemas.BatteryInput
export type PatchComponentsBatteryByIdBody = Schemas.BatteryInput
export type PostComponentsCameraBody = Schemas.CameraInput
export type PatchComponentsCameraByIdBody = Schemas.CameraInput
export type PostComponentsCaseBody = Schemas.CaseInput
export type PatchComponentsCaseByIdBody = Schemas.CaseInput
export type PostComponentsControllerBody = Schemas.ControllerInput
export type PatchComponentsControllerByIdBody = Schemas.ControllerInput
export type PostComponentsDriveBody = Schemas.DriveInput
export type PatchComponentsDriveByIdBody = Schemas.DriveInput
export type PostComponentsFirmwareBody = Schemas.FirmwareInput
export type PatchComponentsFirmwareByIdBody = Schemas.FirmwareInput
export type PostComponentsGenericDeviceBody = Schemas.GenericDeviceInput
export type PatchComponentsGenericDeviceByIdBody = Schemas.GenericDeviceInput
export type PostComponentsGraphicCardBody = Schemas.GraphicCardInput
export type PatchComponentsGraphicCardByIdBody = Schemas.GraphicCardInput
export type PostComponentsHardDriveBody = Schemas.HardDriveInput
export type PatchComponentsHardDriveByIdBody = Schemas.HardDriveInput
export type PostComponentsMemoryBody = Schemas.MemoryInput
export type PatchComponentsMemoryByIdBody = Schemas.MemoryInput
export type PostComponentsNetworkCardBody = Schemas.NetworkCardInput
export type PatchComponentsNetworkCardByIdBody = Schemas.NetworkCardInput
export type PostComponentsPCIDeviceBody = Schemas.PCIDeviceInput
export type PatchComponentsPCIDeviceByIdBody = Schemas.PCIDeviceInput
export type PostComponentsPowerSupplyBody = Schemas.PowerSupplyInput
export type PatchComponentsPowerSupplyByIdBody = Schemas.PowerSupplyInput
export type PostComponentsProcessorBody = Schemas.ProcessorInput
export type PatchComponentsProcessorByIdBody = Schemas.ProcessorInput
export type PostComponentsSIMCardBody = Schemas.SIMCardInput
export type PatchComponentsSIMCardByIdBody = Schemas.SIMCardInput
export type PostComponentsSensorBody = Schemas.SensorInput
export type PatchComponentsSensorByIdBody = Schemas.SensorInput
export type PostComponentsSoundCardBody = Schemas.SoundCardInput
export type PatchComponentsSoundCardByIdBody = Schemas.SoundCardInput
export type PostComponentsSystemboardBody = Schemas.SystemboardInput
export type PatchComponentsSystemboardByIdBody = Schemas.SystemboardInput
export type PostComputerByItemsIdNoteBody = Schemas.NoteInput
export type PatchComputerByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostConsumableItemByItemsIdNoteBody = Schemas.NoteInput
export type PatchConsumableItemByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostContactByItemsIdNoteBody = Schemas.NoteInput
export type PatchContactByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostDCRoomByItemsIdNoteBody = Schemas.NoteInput
export type PatchDCRoomByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostDatabaseByItemsIdNoteBody = Schemas.NoteInput
export type PatchDatabaseByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostDatabaseInstanceByItemsIdNoteBody = Schemas.NoteInput
export type PatchDatabaseInstanceByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostDomainByItemsIdNoteBody = Schemas.NoteInput
export type PatchDomainByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostDomainRecordByItemsIdNoteBody = Schemas.NoteInput
export type PatchDomainRecordByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostDropdownsApplianceEnvironmentBody = Schemas.ApplianceEnvironmentInput
export type PatchDropdownsApplianceEnvironmentByIdBody = Schemas.ApplianceEnvironmentInput
export type PostDropdownsApplianceTypeBody = Schemas.ApplianceTypeInput
export type PatchDropdownsApplianceTypeByIdBody = Schemas.ApplianceTypeInput
export type PostDropdownsApprovalStepBody = Schemas.ApprovalStepInput
export type PatchDropdownsApprovalStepByIdBody = Schemas.ApprovalStepInput
export type PostDropdownsAutoUpdateSystemBody = Schemas.AutoUpdateSystemInput
export type PatchDropdownsAutoUpdateSystemByIdBody = Schemas.AutoUpdateSystemInput
export type PostDropdownsBudgetTypeBody = Schemas.BudgetTypeInput
export type PatchDropdownsBudgetTypeByIdBody = Schemas.BudgetTypeInput
export type PostDropdownsBusinessCriticityBody = Schemas.BusinessCriticityInput
export type PatchDropdownsBusinessCriticityByIdBody = Schemas.BusinessCriticityInput
export type PostDropdownsCableStrandBody = Schemas.CableStrandInput
export type PatchDropdownsCableStrandByIdBody = Schemas.CableStrandInput
export type PostDropdownsCableTypeBody = Schemas.CableTypeInput
export type PatchDropdownsCableTypeByIdBody = Schemas.CableTypeInput
export type PostDropdownsCalendarBody = Schemas.CalendarInput
export type PatchDropdownsCalendarByIdBody = Schemas.CalendarInput
export type PostDropdownsCalendarTimeRangeBody = Schemas.CalendarTimeRangeInput
export type PatchDropdownsCalendarTimeRangeByIdBody = Schemas.CalendarTimeRangeInput
export type PostDropdownsCameraImageFormatBody = Schemas.CameraImageFormatInput
export type PatchDropdownsCameraImageFormatByIdBody = Schemas.CameraImageFormatInput
export type PostDropdownsCameraImageResolutionBody = Schemas.CameraImageResolutionInput
export type PatchDropdownsCameraImageResolutionByIdBody = Schemas.CameraImageResolutionInput
export type PostDropdownsCartridgeItemTypeBody = Schemas.CartridgeItemTypeInput
export type PatchDropdownsCartridgeItemTypeByIdBody = Schemas.CartridgeItemTypeInput
export type PostDropdownsCertificateTypeBody = Schemas.CertificateTypeInput
export type PatchDropdownsCertificateTypeByIdBody = Schemas.CertificateTypeInput
export type PostDropdownsCloseTimeBody = Schemas.CloseTimeInput
export type PatchDropdownsCloseTimeByIdBody = Schemas.CloseTimeInput
export type PostDropdownsClusterTypeBody = Schemas.ClusterTypeInput
export type PatchDropdownsClusterTypeByIdBody = Schemas.ClusterTypeInput
export type PostDropdownsComputerModelBody = Schemas.ComputerModelInput
export type PatchDropdownsComputerModelByIdBody = Schemas.ComputerModelInput
export type PostDropdownsComputerTypeBody = Schemas.ComputerTypeInput
export type PatchDropdownsComputerTypeByIdBody = Schemas.ComputerTypeInput
export type PostDropdownsConsumableItemTypeBody = Schemas.ConsumableItemTypeInput
export type PatchDropdownsConsumableItemTypeByIdBody = Schemas.ConsumableItemTypeInput
export type PostDropdownsContactTypeBody = Schemas.ContactTypeInput
export type PatchDropdownsContactTypeByIdBody = Schemas.ContactTypeInput
export type PostDropdownsContractTypeBody = Schemas.ContractTypeInput
export type PatchDropdownsContractTypeByIdBody = Schemas.ContractTypeInput
export type PostDropdownsDatabaseInstanceCategoryBody = Schemas.DatabaseInstanceCategoryInput
export type PatchDropdownsDatabaseInstanceCategoryByIdBody = Schemas.DatabaseInstanceCategoryInput
export type PostDropdownsDatabaseInstanceTypeBody = Schemas.DatabaseInstanceTypeInput
export type PatchDropdownsDatabaseInstanceTypeByIdBody = Schemas.DatabaseInstanceTypeInput
export type PostDropdownsDeniedMailContentBody = Schemas.DeniedMailContentInput
export type PatchDropdownsDeniedMailContentByIdBody = Schemas.DeniedMailContentInput
export type PostDropdownsDenyListBody = Schemas.DenyListInput
export type PatchDropdownsDenyListByIdBody = Schemas.DenyListInput
export type PostDropdownsDocumentCategoryBody = Schemas.DocumentCategoryInput
export type PatchDropdownsDocumentCategoryByIdBody = Schemas.DocumentCategoryInput
export type PostDropdownsDocumentTypeBody = Schemas.DocumentTypeInput
export type PatchDropdownsDocumentTypeByIdBody = Schemas.DocumentTypeInput
export type PostDropdownsDomainRecordTypeBody = Schemas.DomainRecordTypeInput
export type PatchDropdownsDomainRecordTypeByIdBody = Schemas.DomainRecordTypeInput
export type PostDropdownsDomainRelationBody = Schemas.DomainRelationInput
export type PatchDropdownsDomainRelationByIdBody = Schemas.DomainRelationInput
export type PostDropdownsDomainTypeBody = Schemas.DomainTypeInput
export type PatchDropdownsDomainTypeByIdBody = Schemas.DomainTypeInput
export type PostDropdownsEnclosureModelBody = Schemas.EnclosureModelInput
export type PatchDropdownsEnclosureModelByIdBody = Schemas.EnclosureModelInput
export type PostDropdownsEventCategoryBody = Schemas.EventCategoryInput
export type PatchDropdownsEventCategoryByIdBody = Schemas.EventCategoryInput
export type PostDropdownsFilesystemBody = Schemas.FilesystemInput
export type PatchDropdownsFilesystemByIdBody = Schemas.FilesystemInput
export type PostDropdownsFollowupTemplateBody = Schemas.FollowupTemplateInput
export type PatchDropdownsFollowupTemplateByIdBody = Schemas.FollowupTemplateInput
export type PostDropdownsHardDriveTypeBody = Schemas.HardDriveTypeInput
export type PatchDropdownsHardDriveTypeByIdBody = Schemas.HardDriveTypeInput
export type PostDropdownsITILCategoryBody = Schemas.ITILCategoryInput
export type PatchDropdownsITILCategoryByIdBody = Schemas.ITILCategoryInput
export type PostDropdownsItemPlugBody = Schemas.ItemPlugInput
export type PatchDropdownsItemPlugByIdBody = Schemas.ItemPlugInput
export type PostDropdownsLicenseTypeBody = Schemas.LicenseTypeInput
export type PatchDropdownsLicenseTypeByIdBody = Schemas.LicenseTypeInput
export type PostDropdownsLineTypeBody = Schemas.LineTypeInput
export type PatchDropdownsLineTypeByIdBody = Schemas.LineTypeInput
export type PostDropdownsLocationBody = Schemas.LocationInput
export type PatchDropdownsLocationByIdBody = Schemas.LocationInput
export type PostDropdownsManufacturerBody = Schemas.ManufacturerInput
export type PatchDropdownsManufacturerByIdBody = Schemas.ManufacturerInput
export type PostDropdownsMonitorModelBody = Schemas.MonitorModelInput
export type PatchDropdownsMonitorModelByIdBody = Schemas.MonitorModelInput
export type PostDropdownsMonitorTypeBody = Schemas.MonitorTypeInput
export type PatchDropdownsMonitorTypeByIdBody = Schemas.MonitorTypeInput
export type PostDropdownsNetworkBody = Schemas.NetworkInput
export type PatchDropdownsNetworkByIdBody = Schemas.NetworkInput
export type PostDropdownsNetworkEquipmentModelBody = Schemas.NetworkEquipmentModelInput
export type PatchDropdownsNetworkEquipmentModelByIdBody = Schemas.NetworkEquipmentModelInput
export type PostDropdownsNetworkEquipmentTypeBody = Schemas.NetworkEquipmentTypeInput
export type PatchDropdownsNetworkEquipmentTypeByIdBody = Schemas.NetworkEquipmentTypeInput
export type PostDropdownsNetworkPortFiberchannelTypeBody = Schemas.NetworkPortFiberchannelTypeInput
export type PatchDropdownsNetworkPortFiberchannelTypeByIdBody = Schemas.NetworkPortFiberchannelTypeInput
export type PostDropdownsNetworkPortTypeBody = Schemas.NetworkPortTypeInput
export type PatchDropdownsNetworkPortTypeByIdBody = Schemas.NetworkPortTypeInput
export type PostDropdownsPCIVendorBody = Schemas.PCIVendorInput
export type PatchDropdownsPCIVendorByIdBody = Schemas.PCIVendorInput
export type PostDropdownsPeripheralModelBody = Schemas.PeripheralModelInput
export type PatchDropdownsPeripheralModelByIdBody = Schemas.PeripheralModelInput
export type PostDropdownsPeripheralTypeBody = Schemas.PeripheralTypeInput
export type PatchDropdownsPeripheralTypeByIdBody = Schemas.PeripheralTypeInput
export type PostDropdownsPhoneModelBody = Schemas.PhoneModelInput
export type PatchDropdownsPhoneModelByIdBody = Schemas.PhoneModelInput
export type PostDropdownsPhonePowerSupplyBody = Schemas.PhonePowerSupplyInput
export type PatchDropdownsPhonePowerSupplyByIdBody = Schemas.PhonePowerSupplyInput
export type PostDropdownsPhoneTypeBody = Schemas.PhoneTypeInput
export type PatchDropdownsPhoneTypeByIdBody = Schemas.PhoneTypeInput
export type PostDropdownsPlugBody = Schemas.PlugInput
export type PatchDropdownsPlugByIdBody = Schemas.PlugInput
export type PostDropdownsPrinterModelBody = Schemas.PrinterModelInput
export type PatchDropdownsPrinterModelByIdBody = Schemas.PrinterModelInput
export type PostDropdownsPrinterTypeBody = Schemas.PrinterTypeInput
export type PatchDropdownsPrinterTypeByIdBody = Schemas.PrinterTypeInput
export type PostDropdownsProjectTaskTypeBody = Schemas.ProjectTaskTypeInput
export type PatchDropdownsProjectTaskTypeByIdBody = Schemas.ProjectTaskTypeInput
export type PostDropdownsProjectTypeBody = Schemas.ProjectTypeInput
export type PatchDropdownsProjectTypeByIdBody = Schemas.ProjectTypeInput
export type PostDropdownsRequestTypeBody = Schemas.RequestTypeInput
export type PatchDropdownsRequestTypeByIdBody = Schemas.RequestTypeInput
export type PostDropdownsSolutionTemplateBody = Schemas.SolutionTemplateInput
export type PatchDropdownsSolutionTemplateByIdBody = Schemas.SolutionTemplateInput
export type PostDropdownsSolutionTypeBody = Schemas.SolutionTypeInput
export type PatchDropdownsSolutionTypeByIdBody = Schemas.SolutionTypeInput
export type PostDropdownsStateBody = Schemas.StateInput
export type PatchDropdownsStateByIdBody = Schemas.StateInput
export type PostDropdownsStencilBody = Schemas.StencilInput
export type PatchDropdownsStencilByIdBody = Schemas.StencilInput
export type PostDropdownsSupplierTypeBody = Schemas.SupplierTypeInput
export type PatchDropdownsSupplierTypeByIdBody = Schemas.SupplierTypeInput
export type PostDropdownsTaskCategoryBody = Schemas.TaskCategoryInput
export type PatchDropdownsTaskCategoryByIdBody = Schemas.TaskCategoryInput
export type PostDropdownsTaskTemplateBody = Schemas.TaskTemplateInput
export type PatchDropdownsTaskTemplateByIdBody = Schemas.TaskTemplateInput
export type PostDropdownsUSBVendorBody = Schemas.USBVendorInput
export type PatchDropdownsUSBVendorByIdBody = Schemas.USBVendorInput
export type PostDropdownsValidationTemplateBody = Schemas.ValidationTemplateInput
export type PatchDropdownsValidationTemplateByIdBody = Schemas.ValidationTemplateInput
export type PostDropdownsVirtualMachineModelBody = Schemas.VirtualMachineModelInput
export type PatchDropdownsVirtualMachineModelByIdBody = Schemas.VirtualMachineModelInput
export type PostDropdownsVirtualMachineStateBody = Schemas.VirtualMachineStateInput
export type PatchDropdownsVirtualMachineStateByIdBody = Schemas.VirtualMachineStateInput
export type PostDropdownsVirtualMachineTypeBody = Schemas.VirtualMachineTypeInput
export type PatchDropdownsVirtualMachineTypeByIdBody = Schemas.VirtualMachineTypeInput
export type PostDropdownsWifiNetworkBody = Schemas.WifiNetworkInput
export type PatchDropdownsWifiNetworkByIdBody = Schemas.WifiNetworkInput
export type PostEnclosureByItemsIdNoteBody = Schemas.NoteInput
export type PatchEnclosureByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostEntityByItemsIdNoteBody = Schemas.NoteInput
export type PatchEntityByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostGroupByItemsIdNoteBody = Schemas.NoteInput
export type PatchGroupByItemsIdNoteByIdBody = Schemas.NoteInput
export type PatchInventoryAgentByIdBody = Schemas.AgentInput
export type PostInventoryLockedFieldBody = Schemas.LockedFieldInput
export type PatchInventoryLockedFieldByIdBody = Schemas.LockedFieldInput
export type PostInventorySNMPCredentialBody = Schemas.SNMPCredentialInput
export type PatchInventorySNMPCredentialByIdBody = Schemas.SNMPCredentialInput
export type PostKnowledgebaseArticleBody = Schemas.KBArticleInput
export type PatchKnowledgebaseArticleByArticleIdBody = Schemas.KBArticleInput
export type PostKnowledgebaseArticleByArticleIdCommentBody = Schemas.KBArticleCommentInput
export type PatchKnowledgebaseArticleByArticleIdCommentByIdBody = Schemas.KBArticleCommentInput
export type PostKnowledgebaseCategoryBody = Schemas.KBCategoryInput
export type PatchKnowledgebaseCategoryByIdBody = Schemas.KBCategoryInput
export type PostLineByItemsIdNoteBody = Schemas.NoteInput
export type PatchLineByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostManagementBudgetBody = Schemas.BudgetInput
export type PatchManagementBudgetByIdBody = Schemas.BudgetInput
export type PostManagementBudgetByItemsIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchManagementBudgetByItemsIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostManagementClusterBody = Schemas.ClusterInput
export type PatchManagementClusterByIdBody = Schemas.ClusterInput
export type PostManagementClusterByItemsIdContractBody = Schemas.ContractItemInput
export type PatchManagementClusterByItemsIdContractByIdBody = Schemas.ContractItemInput
export type PostManagementContactBody = Schemas.ContactInput
export type PatchManagementContactByIdBody = Schemas.ContactInput
export type PostManagementContractBody = Schemas.ContractInput
export type PatchManagementContractByIdBody = Schemas.ContractInput
export type PostManagementContractByIdCostBody = Schemas.ContractCostInput
export type PatchManagementContractByIdCostByCostIdBody = Schemas.ContractCostInput
export type PostManagementDataCenterBody = Schemas.DataCenterInput
export type PatchManagementDataCenterByIdBody = Schemas.DataCenterInput
export type PostManagementDatabaseBody = Schemas.DatabaseInput
export type PatchManagementDatabaseByIdBody = Schemas.DatabaseInput
export type PostManagementDatabaseByItemsIdDomainBody = Schemas.DomainItemInput
export type PatchManagementDatabaseByItemsIdDomainByIdBody = Schemas.DomainItemInput
export type PostManagementDatabaseInstanceBody = Schemas.DatabaseInstanceInput
export type PatchManagementDatabaseInstanceByIdBody = Schemas.DatabaseInstanceInput
export type PostManagementDatabaseInstanceByItemsIdCertificateBody = Schemas.CertificateItemInput
export type PatchManagementDatabaseInstanceByItemsIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostManagementDatabaseInstanceByItemsIdContractBody = Schemas.ContractItemInput
export type PatchManagementDatabaseInstanceByItemsIdContractByIdBody = Schemas.ContractItemInput
export type PostManagementDatabaseInstanceByItemsIdDomainBody = Schemas.DomainItemInput
export type PatchManagementDatabaseInstanceByItemsIdDomainByIdBody = Schemas.DomainItemInput
export type PostManagementDocumentBody = Schemas.DocumentInput
export type PatchManagementDocumentByIdBody = Schemas.DocumentInput
export type PostManagementDomainBody = Schemas.DomainInput
export type PatchManagementDomainByIdBody = Schemas.DomainInput
export type PostManagementDomainByItemsIdCertificateBody = Schemas.CertificateItemInput
export type PatchManagementDomainByItemsIdCertificateByIdBody = Schemas.CertificateItemInput
export type PostManagementDomainByItemsIdContractBody = Schemas.ContractItemInput
export type PatchManagementDomainByItemsIdContractByIdBody = Schemas.ContractItemInput
export type PostManagementDomainRecordBody = Schemas.DomainRecordInput
export type PatchManagementDomainRecordByIdBody = Schemas.DomainRecordInput
export type PostManagementLicenseBody = Schemas.LicenseInput
export type PatchManagementLicenseByIdBody = Schemas.LicenseInput
export type PostManagementLineBody = Schemas.LineInput
export type PatchManagementLineByIdBody = Schemas.LineInput
export type PostManagementLineByItemsIdContractBody = Schemas.ContractItemInput
export type PatchManagementLineByItemsIdContractByIdBody = Schemas.ContractItemInput
export type PostManagementSupplierBody = Schemas.SupplierInput
export type PatchManagementSupplierByIdBody = Schemas.SupplierInput
export type PostMonitorByItemsIdNoteBody = Schemas.NoteInput
export type PatchMonitorByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostNetworkEquipmentByItemsIdNoteBody = Schemas.NoteInput
export type PatchNetworkEquipmentByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostNotificationsNotificationBody = Schemas.NotificationInput
export type PatchNotificationsNotificationByIdBody = Schemas.NotificationInput
export type PostNotificationsNotificationByNotificationIdRecipientBody = Schemas.NotificationRecipientInput
export type PostNotificationsNotificationTemplateBody = Schemas.NotificationTemplateInput
export type PatchNotificationsNotificationTemplateByIdBody = Schemas.NotificationTemplateInput
export type PostNotificationsNotificationTemplateByTemplateIdTranslationBody = Schemas.NotificationTemplateTranslationInput
export type PatchNotificationsNotificationTemplateByTemplateIdTranslationByIdBody = Schemas.NotificationTemplateTranslationInput
export type PostPeripheralByItemsIdNoteBody = Schemas.NoteInput
export type PatchPeripheralByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostPhoneByItemsIdNoteBody = Schemas.NoteInput
export type PatchPhoneByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostPrinterByItemsIdNoteBody = Schemas.NoteInput
export type PatchPrinterByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostProblemByItemsIdNoteBody = Schemas.NoteInput
export type PatchProblemByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostProjectBody = Schemas.ProjectInput
export type PostProjectProjectByIdCostBody = Schemas.ProjectCostInput
export type PatchProjectProjectByIdCostByCostIdBody = Schemas.ProjectCostInput
export type PostProjectProjectByItemsIdContractBody = Schemas.ContractItemInput
export type PatchProjectProjectByItemsIdContractByIdBody = Schemas.ContractItemInput
export type PostProjectProjectByItemsIdKBArticleBody = Schemas.KBArticleItemInput
export type PatchProjectProjectByItemsIdKBArticleByIdBody = Schemas.KBArticleItemInput
export type PostProjectTaskBody = Schemas.ProjectTaskInput
export type PatchProjectTaskByIdBody = Schemas.ProjectTaskInput
export type PostProjectTaskByTaskIdTeamMemberBody = Schemas.ProjectTaskTeamMemberInput
export type PatchProjectByIdBody = Schemas.ProjectInput
export type PostProjectByItemsIdNoteBody = Schemas.NoteInput
export type PatchProjectByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostProjectByProjectIdChangeBody = Schemas.ITILProjectInput
export type PostProjectByProjectIdProblemBody = Schemas.ITILProjectInput
export type PostProjectByProjectIdTaskBody = Schemas.ProjectTaskInput
export type PostProjectByProjectIdTeamMemberBody = Schemas.ProjectTeamMemberInput
export type PostProjectByProjectIdTicketBody = Schemas.ITILProjectInput
export type PostProjectTaskByItemsIdNoteBody = Schemas.NoteInput
export type PatchProjectTaskByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostRackByItemsIdNoteBody = Schemas.NoteInput
export type PatchRackByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostRuleCollectionAssetRuleBody = Schemas.RuleInput
export type PatchRuleCollectionAssetRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionAssetRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionAssetRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionAssetRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionAssetRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionChangeRuleBody = Schemas.RuleInput
export type PatchRuleCollectionChangeRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionChangeRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionChangeRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionChangeRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionChangeRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionDefineItemtypeRuleBody = Schemas.RuleInput
export type PatchRuleCollectionDefineItemtypeRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionDefineItemtypeRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionDefineItemtypeRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionDefineItemtypeRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionDefineItemtypeRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionImportAssetRuleBody = Schemas.RuleInput
export type PatchRuleCollectionImportAssetRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionImportAssetRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionImportAssetRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionImportAssetRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionImportAssetRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionImportEntityRuleBody = Schemas.RuleInput
export type PatchRuleCollectionImportEntityRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionImportEntityRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionImportEntityRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionImportEntityRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionImportEntityRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionLocationRuleBody = Schemas.RuleInput
export type PatchRuleCollectionLocationRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionLocationRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionLocationRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionLocationRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionLocationRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionMailCollectorRuleBody = Schemas.RuleInput
export type PatchRuleCollectionMailCollectorRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionMailCollectorRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionMailCollectorRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionMailCollectorRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionMailCollectorRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionProblemRuleBody = Schemas.RuleInput
export type PatchRuleCollectionProblemRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionProblemRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionProblemRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionProblemRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionProblemRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionRightRuleBody = Schemas.RuleInput
export type PatchRuleCollectionRightRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionRightRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionRightRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionRightRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionRightRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionSoftwareCategoryRuleBody = Schemas.RuleInput
export type PatchRuleCollectionSoftwareCategoryRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionSoftwareCategoryRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionSoftwareCategoryRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionSoftwareCategoryRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionSoftwareCategoryRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PostRuleCollectionTicketRuleBody = Schemas.RuleInput
export type PatchRuleCollectionTicketRuleByIdBody = Schemas.RuleInput
export type PostRuleCollectionTicketRuleByRuleIdActionBody = Schemas.RuleActionInput
export type PatchRuleCollectionTicketRuleByRuleIdActionByIdBody = Schemas.RuleActionInput
export type PostRuleCollectionTicketRuleByRuleIdCriteriaBody = Schemas.RuleCriteriaInput
export type PatchRuleCollectionTicketRuleByRuleIdCriteriaByIdBody = Schemas.RuleCriteriaInput
export type PatchSetupAutomaticActionByIdBody = Schemas.AutomaticActionInput
export type PatchSetupConfigByContextByNameBody = Schemas.ConfigInput
export type PostSetupEmailAuthServerBody = Schemas.EmailAuthServerInput
export type PatchSetupEmailAuthServerByIdBody = Schemas.EmailAuthServerInput
export type PostSetupEmailCollectorBody = Schemas.EmailCollectorInput
export type PatchSetupEmailCollectorByIdBody = Schemas.EmailCollectorInput
export type PostSetupExternalLinkBody = Schemas.ExternalLinkInput
export type PatchSetupExternalLinkByIdBody = Schemas.ExternalLinkInput
export type PostSetupFieldUnicityBody = Schemas.FieldUnicityInput
export type PatchSetupFieldUnicityByIdBody = Schemas.FieldUnicityInput
export type PostSetupLDAPDirectoryBody = Schemas.LDAPDirectoryInput
export type PatchSetupLDAPDirectoryByIdBody = Schemas.LDAPDirectoryInput
export type PostSetupLDAPDirectoryReplicateBody = Schemas.LDAPDirectoryReplicateInput
export type PatchSetupLDAPDirectoryReplicateByIdBody = Schemas.LDAPDirectoryReplicateInput
export type PostSetupManualLinkBody = Schemas.ManualLinkInput
export type PatchSetupManualLinkByIdBody = Schemas.ManualLinkInput
export type PostSetupOAuthClientBody = Schemas.OAuthClientInput
export type PatchSetupOAuthClientByIdBody = Schemas.OAuthClientInput
export type PostSetupOLABody = Schemas.OLAInput
export type PatchSetupOLAByIdBody = Schemas.OLAInput
export type PostSetupOLALevelBody = Schemas.OLALevelInput
export type PatchSetupOLALevelByIdBody = Schemas.OLALevelInput
export type PostSetupQueuedWebhookBody = Schemas.QueuedWebhookInput
export type PatchSetupQueuedWebhookByIdBody = Schemas.QueuedWebhookInput
export type PostSetupSLABody = Schemas.SLAInput
export type PatchSetupSLAByIdBody = Schemas.SLAInput
export type PostSetupSLALevelBody = Schemas.SLALevelInput
export type PatchSetupSLALevelByIdBody = Schemas.SLALevelInput
export type PostSetupSLMBody = Schemas.SLMInput
export type PatchSetupSLMByIdBody = Schemas.SLMInput
export type PostSetupWebhookBody = Schemas.WebhookInput
export type PatchSetupWebhookByIdBody = Schemas.WebhookInput
export type PostSetupWebhookCategoryBody = Schemas.WebhookCategoryInput
export type PatchSetupWebhookCategoryByIdBody = Schemas.WebhookCategoryInput
export type PostSoftwareByItemsIdNoteBody = Schemas.NoteInput
export type PatchSoftwareByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostSoftwareLicenseByItemsIdNoteBody = Schemas.NoteInput
export type PatchSoftwareLicenseByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostSupplierByItemsIdNoteBody = Schemas.NoteInput
export type PatchSupplierByItemsIdNoteByIdBody = Schemas.NoteInput
export type PostToolsRSSFeedBody = Schemas.RSSFeedInput
export type PatchToolsRSSFeedByIdBody = Schemas.RSSFeedInput
export type PostToolsReminderBody = Schemas.ReminderInput
export type PatchToolsReminderByIdBody = Schemas.ReminderInput
