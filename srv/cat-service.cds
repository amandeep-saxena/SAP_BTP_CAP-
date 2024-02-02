using Moresco from '../db/schema';


service MyService {

    entity PurchasesInfo     as projection on Moresco.PurchasesInfo;
    entity Chart_of_Accounts as projection on Moresco.Chart_of_Accounts;
    entity UserInfo          as projection on Moresco.UserInfo;

    entity dup {
        key Id        : Integer;
            projectId : Integer;
    }

    entity dup1 {
        key Id        : Integer;
            fromDate  : Date;
            toDate    : Date;
            projectId : Integer;
    }

    action loginUser(data : String) returns {
        Status : Integer
    }
}
