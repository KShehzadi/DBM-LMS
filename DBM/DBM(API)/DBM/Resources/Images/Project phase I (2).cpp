#include<iostream>
#include<cstring>
#include<fstream>
using namespace std;

                        // ********************************** GLOBAL CONSTANTS*******************************//
const int MAX_BOOK_ID=13;  //                             
const int DATE_SIZE=11;                                  
const int  MAX_COPY_NUMBER=17 ;                                  
const int  MAX_BOOKS=200;                                         
const int  MAX_CAEGORIE=30;                                         
const int  MAX_BOOK_NAME=60;    //                                         
const int  MAX_CATEGORY_NAME=20; //
const int  MAX_CATEGORY_NUMBER=4;  //
                       // ********************************** PRINT MENU*******************************//
void printMenu()
{
cout<<"**** Welcome to University Library Management System ****"<<endl;
cout<<" Choose the Following Options"<<endl;
cout<<"1  	Category Management(A,E,L,D)"<<endl;
cout<<"2    Books Management(A,E,L,D)"<<endl;
cout<<"3  	Book Copies Management(A,E,L,D)"<<endl;
cout<<"1  	Exit Program(0E)"<<endl<<endl<<endl;		
}
                      // ********************************** VALIDITY CATEGORY NUMBER*********************************//

 bool isValidCategoryNumber( char bookcategory[MAX_CATEGORY_NUMBER])
{
	bool isfound=false;
	for(int i=0;i<MAX_CATEGORY_NUMBER && bookcategory[i]!='\0' ;i++)
	{  
	    if(bookcategory[i]>='0' && bookcategory[i]<='9')
	    {
		
		isfound=true;
    	}
		else 
		{
			isfound=false;
			break;
		}
	}
	
	
	if(isfound)
	
	return true;
	
	else
	
	return false;    
}

                             // ********************************** VALIDATION CATEGORY NAME*********************************//

bool isValidCategoryName(char bookCategoryname[MAX_CATEGORY_NAME])
{
	bool isfound=false;
	for(int i=0;i< MAX_CATEGORY_NAME && (bookCategoryname[i]!='\0' );i++)
	{ 
	  if((bookCategoryname[i]>='A'&&  bookCategoryname[i]<='Z') || ( bookCategoryname[i]>='a' &&  bookCategoryname[i]<='z')  )
	  {
	  isfound=true;
      }
	  else
	  {
	  	isfound=false;
	  	break;	
	  }
	  

	 }
	if(isfound)
	
		return true;

	else
	
		return false; 
}
                           // *************************************** ADD CATEGORY************************************//

bool AddCategory(char CatergoryNo[][MAX_CATEGORY_NUMBER],char CatergoryName[][MAX_CATEGORY_NAME], int ArraySize, char newCategoryId[], char newCategoryName[]) 
{
		  
	 int L=strlen(newCategoryId);
	 int L2=strlen(newCategoryName);
	 for(int i=0;i<MAX_CATEGORY_NUMBER;i++)
	 {
	 	if(i<L)
	 	 CatergoryNo[ArraySize][i]=newCategoryId[i];
	 	 else
	 	 CatergoryNo[ArraySize][i]='-';
	 }
	
	 for(int i=0;i<MAX_CATEGORY_NAME;i++)
	 {
	 	if(i<L2)
		 CatergoryName[ArraySize][i]=newCategoryName[i];
		 else
		 CatergoryName[ArraySize][i]='-'; 
	 }


 cout<<"Data is Added Successfully";	 	 
 return true;	
}
                                // *************************************** DELETE CATEGORY************************************//

bool DeleteCategory(char CatergoryNo[][MAX_CATEGORY_NUMBER],char CatergoryName[][MAX_CATEGORY_NAME], int ArraySize, char CategoryId[]) 
{ 
for (int q = 0; q < 10; q++)
    {
    	for (int w = 0; w < 3; w++)
    	{
    		cout << CatergoryNo[q][w];
		}
	}
    int loc,k=0;
    int LEN=strlen(CategoryId);
     for(int i=0;i<10;i++)
   {
   	k=0;
     for(int j=0;j<LEN;j++)
     {
     	if(CatergoryNo[i][j]==CategoryId[j] )
     	{ 
     	loc=i;
     	k++;
        }

	 }
        if(k==LEN)
     	break;
   }
   
   if(k==LEN)
   {
   	  for(int j=0;j<MAX_CATEGORY_NUMBER;j++)
	  CatergoryNo[loc][j]='-';  	
	
   	  for(int j=0;j<MAX_CATEGORY_NAME;j++)
	  CatergoryName[loc][j]='-';  
	  		 	
    cout<<"Data is Deleted Successfully \n";
    for (int q = 0; q < 10; q++)
    {
    	for (int w = 0; w < 3; w++)
    	{
    		cout << CatergoryNo[q][w];
		}
	}
   }
   else
   cout<<"Data is not Deleted \n";
   
   
}

                           // *************************************** UPDATE CATEGORY************************************//
                           
bool UpdateCategory(char CatergoryNo[][MAX_CATEGORY_NUMBER],char CatergoryName[][MAX_CATEGORY_NAME], int ArraySize, char prevCategoryId[], char newCategoryId[], char newCategoryName[])                                
{	
  
   	int L=strlen( prevCategoryId);
    int loc,k;
    for(int i=0;i<=ArraySize;i++)
    { 
    k=0;
    for (int j=0;j<L;j++)
    {   
    	if( CatergoryNo[i][j]==prevCategoryId[j])
    	{  
    	loc=i;
    	k++;
		}
	 
	}
	    if(k==L)
        break;
	}
	
	
	  int L1=strlen(newCategoryId);
	  int L2=strlen(newCategoryName);
      for(int i=0;i<MAX_CATEGORY_NUMBER;i++)
      {
	  if(i<L1)
	  CatergoryNo[loc][i]=newCategoryId[i];
	  else
	  CatergoryNo[loc][i]='-';
      }
      
      
	  for(int i=0;i<MAX_CATEGORY_NAME;i++)
	  {
	  if(i<L2)
	  CatergoryName[loc][i]=newCategoryName[i];	
	  else
	  CatergoryName[loc][i]='-';
	  }
	  
     
	   cout<<"DATA is Updated Successfully\n";

}
                                  //****************************************************PRINT CATEGORY****************************************//

void PrintCategories(char CatergoryNo[][MAX_CATEGORY_NUMBER],char CatergoryName[][MAX_CATEGORY_NAME], int ArraySize)
 {
   for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_CATEGORY_NUMBER;j++)
   	{
	  if((CatergoryNo[i][j]>='0' && CatergoryNo[i][j]<='9')  || CatergoryNo[i][j]=='-')
	  {
	      cout<<CatergoryNo[i][j];
	   }
   	  else
   	  { 
   	    
		 CatergoryNo[i][j]='-';
		 cout<<CatergoryNo[i][j];
   	  	
	 }
   }
   cout<<endl;
  }
  
    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_CATEGORY_NAME;j++)
   	{
	  if((CatergoryName[i][j]>='A' && CatergoryName[i][j]<='Z')  || (CatergoryName[i][j]>='a' && CatergoryName[i][j]<='z') || CatergoryName[i][j]=='-')
	  {
	      cout<<CatergoryName[i][j];
	  }
   	  else
   	  { 
		 CatergoryName[i][j]='-';
		 cout<<CatergoryName[i][j];
	 }
   }
   cout<<endl;
  }
 
 cout<<" - Represents that Row is Empty \n"; 
  
}
                //**************************************SAVE CATEGORY FILE************************************//

void SaveCategories(char CatergoryNo[][MAX_CATEGORY_NUMBER],char CatergoryName[][MAX_CATEGORY_NAME], int ArraySize,char fileName[]) 
{
  ofstream FILE;
  FILE.open("CATEGORIES.txt");
  
  FILE<<"Category ID Data is as Follows:\n";
     for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_CATEGORY_NUMBER;j++)
   	{
	  if((CatergoryNo[i][j]>='0' && CatergoryNo[i][j]<='9')  || CatergoryNo[i][j]=='-')
	  {
	      FILE<<CatergoryNo[i][j];
	   }
   	  else
   	  { 
   	    
		 CatergoryNo[i][j]='-';
		 FILE<<CatergoryNo[i][j];
   	  	
	 }
   }
   FILE<<endl;
  }
  
  FILE<<"Category Name Data is as Follows:\n";
  
    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_CATEGORY_NAME;j++)
   	{
	  if((CatergoryName[i][j]>='A' && CatergoryName[i][j]<='Z')  || (CatergoryName[i][j]>='a' && CatergoryName[i][j]<='z') || CatergoryName[i][j]=='-')
	  {
	      FILE<<CatergoryName[i][j];
	  }
   	  else
   	  { 
		 CatergoryName[i][j]='-';
		 FILE<<CatergoryName[i][j];
	 }
   }
   FILE<<endl;
   
  }
   cout<<" - Represents that Row is Empty \n"; 
  FILE.close();
  
  cout<<"DATA is Saved Successfully\n";	
  
	
	
}
              //*******************************LOAD CATEGORY******************************//

void LoadCategories(char CatergoryNo[][MAX_CATEGORY_NUMBER],char CatergoryName[][MAX_CATEGORY_NAME], int ArraySize,char fileName[])
{
	ifstream FILE;
	string DATA;
	FILE.open("CATEGORIES.txt");
    while(getline(FILE,DATA))
    {
    	
    cout<<DATA<<endl;	
    	
    	
	}
 
 
FILE.close();	   
  }
   //*******************************************************************************************************************************************************************************//
   
                           //**********************************************VALIDITY OF BOOK ID******************************************//
 bool isValidBookId(char bookId[MAX_BOOK_ID])
{
	bool YES=false,found=false,ifound=false,isfound=false;
	
	for(int i=0;i<MAX_BOOK_ID && bookId[i]!='\0';i++)	
	{   if(i>=0 && i<3)            
        {
        	
 		if(bookId[i]>='0' && bookId[i]<='9')
 		YES=true;
 			   
	    }
	    
	    
	    if(YES)
	   	{
		
	     if(bookId[3]=='-' && bookId[6]=='-' )     
	     found=true;
	    }
	     
	     
	    if(found)
		{
	     if(i>=4 && i<=5)                         
		 {
		 	if(bookId[i]>='A' && bookId[i]<='Z')
		 	ifound=true;
		 }
       	}
		
		
		if(ifound)
		{
			if(i>=7 && i<=11  )                    
			if(bookId[i]>='0' && bookId[i]<='9')
			isfound=true;	
		}		
		 
		
	
   	}
   	if(isfound)
	return true;
	else
	return false;	  
	
	
	
	
}  

             //**************************************Validity of book NAME********************************************//


bool isValidBookName(char bookName[ MAX_BOOK_NAME])
{
	bool isfound=false;
	
 for(int i=1;i<MAX_BOOK_NAME && bookName[i]!='\0';i++)
 {
 	
 	if((bookName[i]>='A' && bookName[i]<='Z')|| (bookName[i]>='a' && bookName[i]<='z')  || bookName[i]==':'|| bookName[i]==';' || bookName[i]==' ')
 	{
 		
 		if((bookName[i]==':' && bookName[i-1]==':') || (bookName[i]==';' && bookName[i-1]==';') ||(bookName[i]==' ' && bookName[i-1]==' ') )
 		{
 			isfound=false;
 			break;
		 }
        
        else
        isfound=true;
	}
     
}
 	if(isfound)
 	
    return true;
 	
 	else 
 	return false;
 }	


   
   
   //********************************************ADD BOOK************************************************//
   bool AddBook(char BookId[][MAX_BOOK_ID],char BookName[][MAX_BOOK_NAME], int Editions[],  int ArraySize, char newBookId[], char newBookName[], int edition) 
{
  	 int L=strlen(newBookId);
	 int L2=strlen(newBookName);
	 for(int i=0;i<MAX_BOOK_ID;i++)
	 {
	 	if(i<L)
	 	 BookId[ArraySize][i]=newBookId[i];
	 	 else
	 	 BookId[ArraySize][i]='-';
	 }
	
	 for(int i=0;i<MAX_BOOK_NAME;i++)
	 {
	 	if(i<L2)
		 BookName[ArraySize][i]=newBookName[i];
		 else
		 BookName[ArraySize][i]='-'; 
	 }
	  
	  Editions[ArraySize]=edition;


 cout<<"Data is Added Successfully";
	cin.clear();
}     
    //*****************************DELETE BOOK**************************************//
	
 bool DeleteBook(char BookId[][MAX_BOOK_ID],char BookName[][MAX_BOOK_NAME], int Editions[],  int ArraySize, char BookId1[]) 	
{
     int loc,k=0;
    int LEN=strlen(BookId1);
     for(int i=0;i<10;i++)
   {
   	k=0;
     for(int j=0;j<LEN;j++)
     {
     	if(BookId[i][j]==BookId1[j] )
     	{ 
     	loc=i;
     	k++;
        }

	 }
        if(k==LEN)
     	break;
   }
   
   if(k==LEN)
   {
   	  for(int j=0;j<MAX_BOOK_ID;j++)
	  BookId[loc][j]='-';  	
	
   	  for(int j=0;j<MAX_BOOK_NAME;j++)
	  BookName[loc][j]='-';
	  
	  Editions[loc]=-1;
	    
	  		 	
    cout<<"Data is Deleted Successfully \n";
   }
   else
   cout<<"Data is not Deleted \n";
   	

}	
       //***********************************PRINT BOOK***********************************//

void PrintBooks(char BookId[][MAX_BOOK_ID],char BookName[][MAX_BOOK_NAME], int Editions[],  int ArraySize) 
{

    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_BOOK_ID;j++)
   	{

	      cout<<BookId[i][j];
	 }
	  cout<<endl;
   }
  
  
  
    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_BOOK_NAME;j++)
   	{
	      cout<<BookName[i][j];

	 }
	   cout<<endl;
   }
   
   for(int i=0;i<10;i++)
   cout<<Editions[i]<<endl ;
 
    cout<<" - Represents that Row is Empty \n"; 
  }
 
 //*************************************************UPDATE BOOK******************************************************//

bool UpdateBook(char BookId[][MAX_BOOK_ID],char BookName[][MAX_BOOK_NAME], int Editions[],  int ArraySize, char prevBookId[], char newBookId[], char newBookName[], int edition) 
{
   
   	int L=strlen( prevBookId);
    int loc,k;
    for(int i=0;i<=ArraySize;i++)
    { 
    k=0;
    for (int j=0;j<L;j++)
    {   
    	if( BookId[i][j]==prevBookId[j])
    	{  
    	loc=i;
    	k++;
		}
	 
	}
	    if(k==L)
        break;
	}
	
	
	  int L1=strlen(newBookId);
	  int L2=strlen(newBookName);
      for(int i=0;i<MAX_BOOK_ID;i++)
      {
	  if(i<L1)
	  BookId[loc][i]=newBookId[i];
	  else
	  BookId[loc][i]='-';
      }
      
      
	  for(int i=0;i<MAX_BOOK_NAME;i++)
	  {
	  if(i<L2)
	  
	  BookName[loc][i]=newBookName[i];	
	  else
	  BookName[loc][i]='-';
	  }
	  
	  Editions[loc]=edition;
	  
	   cout<<"DATA is Updated Successfully\n ";
	
	
 }  
	
	//*************************************************SAVE BOOK******************************************//
bool SaveBooks(char BookId[][MAX_BOOK_ID],char BookName[][MAX_BOOK_NAME], int Editions[],  int ArraySize, char filename[]) 
{
	
  ofstream FILE;
  FILE.open("BOOKS.txt");
  
  FILE<<"BOOK ID Data is as Follows:\n";
     for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_BOOK_ID;j++)
   	{
	
	      FILE<<BookId[i][j];
   }
   FILE<<endl;
  }
  
  FILE<<"BOOK Name Data is as Follows:\n";
  
    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_BOOK_NAME;j++)
   	{
	      FILE<<BookName[i][j];
   }
   FILE<<endl; 
  }
  for(int i=0;i<10;i++)
  FILE<<Editions[i]<<endl;
  
   cout<<" - Represents that Row is Empty \n \n"; 
  FILE.close();
	
	}	

//*********************************LOAD BOOKS****************************************//

bool LoadBooks(char BookId[][MAX_BOOK_ID],char BookName[][MAX_BOOK_NAME], int Editions[],  int ArraySize, char filename[]) 	
{
	ifstream FILE1;
	string DATA1;
	FILE1.open("BOOKS.txt");
    while(getline(FILE1,DATA1))
    {	
    cout<<DATA1<<endl;		
	}
FILE1.close();
	
}  //*************************************************************************************************************************************************************************//

                //***************************************Validity OF BOOK SAMPLE*****************************************//
                

bool isValidCopyNumber(char bookCopy[MAX_COPY_NUMBER])
{
	bool YES=false,found=false,ifound=false,isfound=false,gfound=false,Yfound=false;
	
	for(int i=0;i< MAX_COPY_NUMBER && bookCopy[i]!='\0' ;i++)	
	{   if(i>=0 && i<3)            //012
        {
 		if(bookCopy[i]>='0' && bookCopy[i]<='9')
 		YES=true;
 			   
	    }
	    
	    
	    if(YES)
	   	{
		
	     if(bookCopy[3]=='-' && bookCopy[6]=='-' && bookCopy[12]=='#'  && bookCopy[13]=='0') 
		 if( bookCopy[14]=='0' || bookCopy[14]=='1' )     //36
	     found=true;
	     
	    }
	     
	     
	    if(found)
		{
	     if(i>=4 && i<=5)                         //45
		 {
		 	if(bookCopy[i]>='A' && bookCopy[i]<='Z')
		 	ifound=true;
		 }
       	}
		
		
		if(ifound)
		{
			if(i>=7 && i<=11 )                    //7 11
			if(bookCopy[i]>='0' && bookCopy[i]<='9')
			isfound=true;	
		}		
		 
		if(isfound)
		{
		  if(i==15)
		  {
		    
		  if (bookCopy[i-1]=='1')
		  if(bookCopy[i]>='0' && bookCopy[i]<='7')
		  gfound=true;
		  if(bookCopy[i-1]=='0')
		  if(bookCopy[i]>='1' && bookCopy[i]<='9')
		  Yfound=true;
       	}
   	   }
   		
	
}
	if(gfound || Yfound)
	return true;
	else 
	return false;
	
}

     

          //***************************************ADD BOOK SAMPLE*****************************************//

bool AddBookSample (char CopyId[][MAX_COPY_NUMBER],char PulishedDates[][DATE_SIZE], int ArraySize, char newCopyId[], char newPublishDate[]) 
{
	
	
	 int L=strlen(newCopyId);
	 int L2=strlen(newPublishDate);
	 for(int i=0;i<MAX_COPY_NUMBER;i++)
	 {
	 	if(i<L)
	 	 CopyId[ArraySize][i]=newCopyId[i];
	 	 else 
		  break;
	 }
	
	 for(int i=0;i<DATE_SIZE;i++)
	 {
	 	if(i<L2)
		 PulishedDates[ArraySize][i]=newPublishDate[i];
		 else
		  break;
	 }


 cout<<"Data is Added Successfully";	 	 
 }
	
	   //********************************************************PINT COPIES***************************************//
void PrintBookSamples (char CopyId[][MAX_COPY_NUMBER],char PulishedDates[][DATE_SIZE], int ArraySize)  

{
	   for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_COPY_NUMBER;j++)
   	{
	  
	      cout<<CopyId[i][j];
	  
   }
   cout<<endl;
  }
  
    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<DATE_SIZE;j++)
   	{
	  
	      cout<<PulishedDates[i][j];
	  }
   	  cout<<endl; 
   }
  
  
 
 cout<<" - Represents that Row is Empty \n"; 
  	
}

                                  //**********************************DELETE COPIES*********************************************//

bool DeleteBookSample (char CopyId[][MAX_COPY_NUMBER],char PulishedDates[][DATE_SIZE], int ArraySize, char CopyId1[]) 
{
	
    int loc4,k4=0;
    int LEN=strlen(CopyId1);
     for(int i=0;i<10;i++)
   {
   	k4=0;
     for(int j=0;j<LEN;j++)
     {
     	if(CopyId[i][j]==CopyId1[j] )
     	{ 
     	loc4=i;
     	k4++;
        }

	 }
        if(k4==LEN)
     	break;
   }
   
   if(k4==LEN)
   {
   	  for(int j=0;j<MAX_COPY_NUMBER;j++)
	  CopyId[loc4][j]='-';  	
	
   	  for(int j=0;j<DATE_SIZE;j++)
	  PulishedDates[loc4][j]='-';  
	  		 	
    cout<<"Data is Deleted Successfully \n";
   }
   else
   cout<<"Data is not Deleted \n";
 	
	
}
    
	//******************************************LOAD COPIES********************************//
	bool LoadBookSamples (char CopyId[][MAX_COPY_NUMBER],char PulishedDates[][DATE_SIZE], int ArraySize, char fileName[]) 
	{
	ifstream FILE2;
	string DATA2;
	FILE2.open("COPIES.txt");
    while(getline(FILE2,DATA2))
    {	
    cout<<DATA2<<endl;		
	}
FILE2.close();
	
		
	}
	
	
	//**********************************8SAVE COPIES**********************************************//
bool SaveBookSamples (char CopyId[][MAX_COPY_NUMBER],char PulishedDates[][DATE_SIZE], int ArraySize, char fileName[])	
{
	 ofstream FILE;
  FILE.open("COPIES.txt");
  
  FILE<<"BOOK COPIES Data is as Follows:\n";
     for(int i=0;i<10;i++)
   {
   	for(int j=0;j<MAX_COPY_NUMBER;j++)
   	{
	
	      FILE<<CopyId[i][j];
   }
   FILE<<endl;
  }
  
  FILE<<"PUBLISHED DATES Data is as Follows:\n";
  
    for(int i=0;i<10;i++)
   {
   	for(int j=0;j<DATE_SIZE;j++)
   	{
	      FILE<<PulishedDates[i][j];
   }
   FILE<<endl; 
  }
  
  
   cout<<" - Represents that Row is Empty \n \n"; 
  FILE.close();
	
	}	
	
	
	
	//*********************************UPDATE COPIES*******************************//
	
bool UpdateBookSample (char CopyId[][MAX_COPY_NUMBER],char PulishedDates[][DATE_SIZE], int ArraySize, char prevCopyId[], char newCopyId[], char newPublishDate[]) 
{
	int L=strlen( prevCopyId);
    int loc,k;
    for(int i=0;i<=ArraySize;i++)
    { 
    k=0;
    for (int j=0;j<L;j++)
    {   
    	if( CopyId[i][j]==prevCopyId[j])
    	{  
    	loc=i;
    	k++;
		}
	 
	}
	    if(k==L)
        break;
	}
	
	
	  int L1=strlen(newCopyId);
	  int L2=strlen(newPublishDate);
      for(int i=0;i<MAX_COPY_NUMBER;i++)
      {
	  if(i<L1)
	  CopyId[loc][i]=newCopyId[i];
	  else
	  CopyId[loc][i]='-';
      }
      
      
	  for(int i=0;i<DATE_SIZE;i++)
	  {
	  if(i<L2)
	  PulishedDates[loc][i]=newPublishDate[i];	
	  else
	  PulishedDates[loc][i]='-';
	  }
	  
     
	   cout<<"DATA is Updated Successfully\n";
	
	
	
}
	
	
	              // **********************************MAIN*************************************//
                   // ********************************** FUNCTION*******************************//
int main()

  {
    int  mainOption;
	char CopyId[10][MAX_COPY_NUMBER], PulishedDates[10][DATE_SIZE],   newCopyId[MAX_COPY_NUMBER], newPublishDate[DATE_SIZE],CopyId1[MAX_COPY_NUMBER];
    char subOption,prevCopyId[MAX_COPY_NUMBER];
    char newCategoryId[ MAX_CATEGORY_NUMBER],  newCategoryName[ MAX_CATEGORY_NAME]; 
    char CatergoryNo[10][MAX_CATEGORY_NUMBER],CatergoryName[10][MAX_CATEGORY_NAME];
 	char bookcategory[ MAX_CATEGORY_NUMBER];
	char bookcategoryname[MAX_CATEGORY_NAME];
	int  ArraySize;
    char prevCategoryId[MAX_CATEGORY_NUMBER];
    char CategoryId[MAX_CATEGORY_NUMBER];
    string s2; int S2; int S;int LEN,LEN1,L;
    string s; bool Y,X,LL,LL1,W,W1,W2,Q;string ss,ss1,s3;
    char BookId[10][MAX_BOOK_ID], BookName[10][MAX_BOOK_NAME];
	int Editions[10];
	char newBookId[MAX_BOOK_ID], newBookName[MAX_BOOK_NAME],SS[60];
	int edition;
	char bookName[MAX_BOOK_NAME],bookId[MAX_BOOK_ID],BookId1[MAX_BOOK_ID],prevBookId[MAX_BOOK_ID];
	int a,a1,a2,t=1; 	int IL;
	string A0,A2;string s13;int Ls;
	int A1=2;	 string se,se2;
	bool xe;bool LT;string st1;
    int Se,Se2;
	char fileName[20],filename[20],bookCopy[MAX_COPY_NUMBER];
	W2=false; 
	int LENt; 
	
	
	 LoadCategories(CatergoryNo, CatergoryName, ArraySize ,fileName);
	 LoadBooks( BookId, BookName, Editions,  ArraySize, filename);
     LoadBookSamples ( CopyId, PulishedDates,  ArraySize,  fileName) ;
  printMenu();                                    //********************PRINT MENU************************//
  
   
   
   cout<<"Enter no of rows in Category number and name";
   cin>>ArraySize;
     bool x,y;
     
     
     
for(int i=0;i<10;i++)
{
	for(int j=0;j<MAX_CATEGORY_NUMBER;j++)
    CatergoryNo[i][j]='-';
	
}
for(int i=0;i<10;i++)
{
	for(int j=0;j<MAX_CATEGORY_NAME;j++)
    CatergoryName[i][j]='-';
}

for(int i=0;i<10;i++)
{
	
    Editions[i]=-1;
	
}

for(int i=0;i<10;i++)
{
	for(int j=0;j<MAX_BOOK_NAME;j++)
    BookName[i][j]='-';
	
}
for(int i=0;i<10;i++)
{
	for(int j=0;j<MAX_BOOK_ID;j++)
    BookId[i][j]='-';
	
}
  
for(int i=0;i<10;i++)
{
	for(int j=0;j<MAX_COPY_NUMBER;j++)
    CopyId[i][j]='-';
	
}
for(int i=0;i<10;i++)
{
	for(int j=0;j<DATE_SIZE;j++)
    PulishedDates[i][j]='-';
	
}



cout<<"Enter details of Category Number:"<<endl;
for(int j=0;j<ArraySize;j++)
                               //----->Enter Data in array of Category Number
cin>>CatergoryNo[j];

cout<<"Enter details of Category NAME:"<<endl;
for(int j=0;j<ArraySize;j++)
                               //-------->Enter Data in array of Category Name
cin>>CatergoryName[j];

cout<<"Enter details of BOOK ID(NUMBER): ";
for(int j=0;j<ArraySize;j++)
          //----->Enter Data in array of BOOK Number
cin>>BookId[j];

cout<<"Enter details of EDITIONS:"<<endl;
for(int j=0;j<ArraySize;j++)
              //-------->Enter Data in array of Edition
cin>>Editions[j];

cout<<"Enter details of BOOK NAME:";   //-------->Enter Data in array of BOOK Name
for(int j=-1;j<ArraySize;j++)
{
	cin.getline(SS,60);
	IL=strlen(SS);
	
	for(int i=0;i<IL;i++) 
     {
      BookName[j][i]=SS[i];	
	 }
}

cout<<"Enter Details of BOOS COPIES: ";
for(int j=0;j<ArraySize;j++)
          //----->Enter Data in array of BOOK copy
cin>>CopyId[j];
cout<<"Enter Deyails of PUBLISHED DATES: ";
for(int j=0;j<ArraySize;j++)
          //----->Enter Data in array of PUBLISHED DATES
cin>>PulishedDates[j];


while(true)
{

  cout<<"Choose the option: ";               
  cin>>mainOption; 
                 //------->options

switch(mainOption)
{


do{

   case 1: //---------------case 1 inner swiych--------------//
  
 cin>>subOption; 	
   switch(subOption)
   {
   	 case 'A':                                                  //-------->>>>>>>>SUB OPTION   1A
   	 cout<<"Enter the Details of NEW Category(ID and NAME)";
   	 
   	 
   	 cin>>s;
   	 S=s.length();
   	 cin>>s2;
   	S2 =s2.length();
	    //------>NUMBER------->NAME
    
   	for(int i=0;i<S;i++)
	{
	 newCategoryId[i]=s[i];	
	 bookcategory[i]=newCategoryId[i];               //---------->NEW CATEGORY NUMBER
	}
	 
 
 x=isValidCategoryNumber(bookcategory);             //***************************VALID CATEGORY NUMBER******************
	
	for(int i=0;i<S2;i++)
	{
		newCategoryName[i]=s2[i];
    	bookcategoryname[i]=newCategoryName[i];	                     //---------->NEW CATEGORY NAME
	}

   y= isValidCategoryName(bookcategoryname);	        //***************************VALID CATEGORY NAME*******************//
	
	if(x && y)
	{                         
	                       //*******************************ADD CAREGORY********************************//
	                       
	  AddCategory( CatergoryNo, CatergoryName , ArraySize,  newCategoryId,  newCategoryName); 
	 
    }     //IF
   else
   {
   	cout<<"\nData is not entered Successfully";
   }
   break;
    
  case 'D':            /***************case 2 inner switch**************************/
    
   cout<<"Enter category ID to delete: ";
   
   cin>>ss;
   LEN=ss.length();
   for(int i=0;i<MAX_CATEGORY_NUMBER;i++)
   {
   	if(i>=LEN)
   	break;
   	else
   	CategoryId[i]=ss[i];
   }
    LL= DeleteCategory( CatergoryNo, CatergoryName,  ArraySize,  CategoryId) ;
    
    break;

   
                  /***************case 3 inner switch**************************/
   
   
    case 'E':
    	
    cout<<"Enter Category ID to Edit: ";

    cin>>s3;
    L=s3.length();
    for(int i=0;i<MAX_CATEGORY_NUMBER;i++)
    {
    	if(i>=L)
    	break;
    	else
        prevCategoryId[i]=s3[i];	
	}
	//int L=strlen( prevCategoryId);
	
    int loc,k;
    for(int i=0;i<=ArraySize;i++)
    { 
    k=0;
    for (int j=0;j<L;j++)
    {   
    	if( CatergoryNo[i][j]==prevCategoryId[j])
    	{  
    	loc=i;
    	k++;
		}
	 
	}
	    if(k==L)
        break;
	}
	
	if(k==L)
	{
	cout<<"\nEnter New Details of Category (ID,Name) :";
	string s4,s5;
	cin>>s4>>s5;
   
    int	L1=s4.length();
    int L2=s5.length(); 
	
    
     
	for(int i=0;i<MAX_CATEGORY_NUMBER;i++)
	{
		if(i>=L1)
		break;
	else
	{
			
	newCategoryId[i]=s4[i];
	bookcategory[i]=newCategoryId[i];
    }
	}
	
    for(int i=0;i<MAX_CATEGORY_NAME;i++)
	{
		if(i>=L2)
		break;
		else
		{
		
	newCategoryName[i]=s5[i];
	bookcategoryname[i]=newCategoryName[i];	
        }
	}
	      //*****************************VALIDITY NEW CATEGORY ID NO*************************/
   Y = isValidCategoryNumber(bookcategory);  
   X =	isValidCategoryName(bookcategoryname);
	
	if(X && Y)
	{ 
	
	   bool Z= UpdateCategory(CatergoryNo, CatergoryName,  ArraySize,  prevCategoryId,newCategoryId , newCategoryName) ;

	   cout<<"DATA is Updated Successfully\n";
  	
	 } 	//---------INNER IF
	else
    cout<<"DAta is not Valid to UPDATE\n";
		
	}    //------Outer IF
	else
		cout<<"ID OR NAME is not Matched";  
	
    break;
    
   case 'P':
   	cout<<"DATA of CATEGORY ID and NAME is follows\n";
    PrintCategories(CatergoryNo,CatergoryName,ArraySize);
    break;

    
    case 'L':
    	
    LoadCategories(CatergoryNo,CatergoryName, ArraySize,fileName);
    break;
  	
}   //>>>>>>>>>>>>>>>>>>>>>>>>>>>>INNER SWITCH  1   for CATEGORIES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
break;  

case 2:
	
 cin>>subOption; 	
	switch(subOption)
	{
	case 'A':
	cout<<"Enter the details of the book(Id Edition Name) : ";
	
	cin>>A0;      //ID
	cin>>edition;          //EDITION
	cin.getline(newBookName,MAX_BOOK_NAME);     //NAME

	
	a=A0.length();
	a2=strlen(newBookName);
	
	
	for(int i=0;i<a;i++)
	{
		newBookId[i]=A0[i];
		bookId[i]=newBookId[i];
    }

	if(edition>=1 && edition<=15)
	W2=true;	
	

   	for(int i=0;i<a2;i++)
	{
		bookName[i]=newBookName[i];
    }

    
     W= isValidBookId(bookId);
     W1 =isValidBookName(bookName);
 
    if(W && W1 && W2)
    {
    
     AddBook(BookId, BookName, Editions,  ArraySize, newBookId,  newBookName, edition ) ;

	}
	
	else
	cout<<"DATA is Not Added Successfully\n";
	
	break;
	
	
	case'D':
    cout<<"Enter BOOK ID to delete: ";
   
   cin>>ss1;
   LEN1=ss1.length();
   for(int i=0;i<MAX_BOOK_ID;i++)
   {
   	if(i>=LEN1)
   	break;
   	else
   	BookId1[i]=ss1[i];
   }
    LL1=  DeleteBook( BookId, BookName, Editions,  ArraySize, BookId1) ;
    break;
    
    case 'P':
   	cout<<"DATA of BOOK ID and NAME is follows\n";
    PrintBooks( BookId,BookName,  Editions,ArraySize);
	break;
	
	case 'E':
	 cout<<"Enter BOOK ID to Edit: ";
    
    cin>>s13;
    Ls=s13.length();
    for(int i=0;i<MAX_BOOK_ID;i++)
    {
    	if(i>=Ls)
    	break;
    	else
        prevBookId[i]=s13[i];	
	}
	
    int loc1,k1;
    for(int i=0;i<=ArraySize;i++)
    { 
    k1=0;
    for (int j=0;j<Ls;j++)
    {   
    	if( BookId[i][j]==prevBookId[j])
    	{  
    	loc1=i;
    	k1++;
		}
	 
	}
	    if(k1==Ls)
        break;
	}
	
	if(k1==Ls)
	{
	cout<<"\nEnter New Details of BOOK ID EDITION NAME  :";
	string s44,s55;
	
	cin>>s44;
	cin>>edition;
	cin>>s55;
   
    int	L11=s44.length();
    int L22=s55.length(); 
	
    
     
	for(int i=0;i<MAX_BOOK_ID;i++)
	{
		if(i>=L11)
		break;
	else
	{
			
	newBookId[i]=s44[i];
	bookId[i]=newBookId[i];
    }
	}
	
    for(int i=0;i<MAX_BOOK_NAME;i++)
	{
		if(i>=L22)
		break;
		else
		{
		
	newBookName[i]=s55[i];
	bookName[i]=newBookName[i];	
        }
	}
	
	      //*****************************VALIDITY NEW BOOK ID NAME*************************/
   bool YY = isValidBookId(bookId)  ;  
  bool XX =	 isValidBookName(bookName) ;
  if(edition>=1 && edition<=15)
  Q=true;
	
	if(XX && YY && Q)
	{ 
	
	   bool ZZ= UpdateBook( BookId,BookName, Editions,   ArraySize, prevBookId, newBookId,newBookName,edition) ;

	   cout<<"DATA is Updated Successfully\n";
  	
	 } 	//---------INNER IF
	else
    cout<<"DAta is not Valid to UPDATE\n";
		
	}    //------Outer IF
	else
		cout<<"ID OR NAME is not Matched";  
	
    break;
    	
	case 'L':
	 LoadBooks( BookId, BookName, Editions,  ArraySize, filename);
	 break;  	

		
		
  } //----->>>>>>>>>CASE 2 SWITCH
  
  break;

  case 3:
  
   cin>>subOption; 	 
   switch(subOption)
   {
   	 case 'A':
   	 cout<<"Enter the details of the sample(Id Date-of-Purchase):";
   	 cin>>se;
   	 Se=se.length();
   	 cin>>se2;
   	Se2 =se2.length();
	    //------>COPY -->>>>DATE
    
   	for(int i=0;i<Se;i++)
	{
	 newCopyId[i]=se[i];	
	 bookCopy[i]=newCopyId[i];               //---------->NEW BOOK COPY
	}
	for(int i=0;i<Se2;i++)
	{
		newPublishDate[i]=se2[i];
    	                     //---------->NEW PUBLISH DATE
	}

    xe= isValidCopyNumber( bookCopy);             //***************************VALID BOOK COPY*****************
	


  
	if(xe==1)
	{                         
	                       //*******************************ADD CAREGORY********************************//
	 AddBookSample (CopyId, PulishedDates, ArraySize, newCopyId,  newPublishDate) ;                      
	 
    }     //IF
   else
   {
   	cout<<"\nData is not entered Successfully";
   }
   break;
   
   case 'P':
   		
   	
   	
   	cout<<"Data of BOOKS COPIES AND ITS PURCHASED DATED IS AS FOLLOWS:\n";
   	 PrintBookSamples (CopyId ,PulishedDates, ArraySize) ;
   	break;
   	
   	
   	case 'D':
   	char stt[17];
   	cout<<"Enter BOOK COPY TO Delete: ";
	cin>>stt;
   LENt=strlen(stt);
   for(int i=0;i<LENt;i++)
   {
    CopyId1[i]=stt[i];
   }
   	
    LT = DeleteBookSample (CopyId, PulishedDates , ArraySize, CopyId1);
    
   	break;
   	
   	case 'E':
   		
   	 cout<<"Enter BOOK COPY to Edit: ";
    string so;  //ID
    int Lo;
    cin>>so;
    Lo=so.length();
    for(int i=0;i<MAX_COPY_NUMBER;i++)
    {
    	if(i>=Lo)
    	break;
    	else
        prevCopyId[i]=so[i];	
	}
	//int L=strlen( prevCategoryId);
	
    int locc,kk;
    for(int i=0;i<=ArraySize;i++)
    { 
    kk=0;
    for (int j=0;j<Lo;j++)
    {   
    	if( CopyId[i][j]==prevCopyId[j])
    	{  
    	locc=i;
    	kk++;
		}
	 
	}
	    if(kk==Lo)
        break;
	}
	
	if(kk==Lo)
	{
	cout<<"\nEnter New Details of Copy (DATE) :";
	string sn,sm;
	cin>>sn>>sm;
   
    int	L8=sn.length();
    int L9=sm.length(); 
	
    
     
	for(int i=0;i<MAX_COPY_NUMBER;i++)
	{
		if(i>=L8)
		break;
	else
	{
			
	newCopyId[i]=sn[i];
	bookCopy[i]=newCopyId[i];
    }
	}
	
    for(int i=0;i<DATE_SIZE;i++)
	{
		if(i>=L9)
		break;
		else
		{
		
	newPublishDate[i]=sm[i];

        }
	}
	      //*****************************VALIDITY NEW CATEGORY ID NO*************************/
   bool Yn =  isValidCopyNumber( bookCopy)  ; 
  
	
	if( Yn)
	{ 
	
	   bool Zn= UpdateBookSample (CopyId, PulishedDates, ArraySize, prevCopyId, newCopyId, newPublishDate); 

	   cout<<"DATA is Updated Successfully\n";
  	
	 } 	//---------INNER IF
	else
    cout<<"DAta is not Valid to UPDATE\n";
		
	}    //------Outer IF
	else
		cout<<"ID OR NAME is not Matched";  
	
    } //---------->>>>>CASE 3 SWITCH	
  	
break;

case 0:

 cin>>subOption; 	
switch(subOption)
{


SaveCategories(CatergoryNo,CatergoryName, ArraySize,fileName) ;
SaveBooks( BookId ,BookName,  Editions ,ArraySize, fileName); 
SaveBookSamples ( CopyId, PulishedDates, ArraySize, fileName);
break;			
}

}while(subOption!='E');
}    //OUTER SWITCH



if(mainOption==0)
{
cout<<"DATA IS SAVED SUCCESSFULLY IN A FILES"; 
return 0;
}



}  //  >>>>>>OUTER LOOP 


}  //main
	

