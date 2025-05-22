export interface FamilyMember {
  id: number;
  parent_id: number;
  member_id: number;
}

let familyMembers: FamilyMember[] = [];

export const addFamilyMember = (fm: FamilyMember) => {
  familyMembers.push(fm);
};

export const getFamilyMembers = () => familyMembers;
