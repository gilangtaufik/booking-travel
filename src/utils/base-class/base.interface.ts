export interface IUnfilledAtt {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
  }
  
  export interface IUnfilledBy {
    createdBy: string
    updatedBy: string
    deletedBy: string
  }
  
  export type TUnfilledAtt = 'createdAt' | 'updatedAt' | 'isDeleted' | 'deletedAt';
  
  export type TUnfilledWthCreaAtt = 'updatedAt' | 'isDeleted';
  
  export type TUnfilledWthDelAtt = 'createdAt' | 'updatedAt' | 'deletedAt';
  
  export type TUnfilledWthDelByAtt = 'createdBy' | 'updatedBy' | 'deletedBy';
  