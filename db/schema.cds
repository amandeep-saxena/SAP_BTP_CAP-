namespace Moresco;

entity PurchasesInfo {

    key Id        : Integer;
        fromDate  : Date;
        toDate    : Date;
        projectId : Integer;

}


entity Chart_of_Accounts {

    key Id                       : Integer;
        GL_Account               : Int64;
        Description              : String;
        GL_Account_Posting_Block : String;
        Open_Item_Management     : String;
        GL_Account_Type          : String;

}
