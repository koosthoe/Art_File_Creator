/**********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

*********************************************************/

/**********************************************************
 
Save as PDFs.jsx

DESCRIPTION

This sample gets files specified by the user from the 
selected folder and batch processes them and saves them 
as PDFs in the user desired destination with the same 
file name.
 
**********************************************************/

// Main Code [Execution of script begins here]

// uncomment to suppress Illustrator warning dialogs
// app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

var destFolder, sourceFolder, files, fileType, sourceDoc, targetFile, pdfSaveOpts;

// Select the source folder.
//sourceFolder = 'C:/Users/kjoos/Desktop/Art_File_Creator_Sub/bin/ConvertedFiles/SVG';
//sourceFolder = Folder.selectDialog('Select the folder with Illustrator files you want to convert to PDF', '~');
sourceFolder = Folder('C:/Users/kjoos/Desktop/Art_File_Creator/bin/ConvertedFiles/SVG');
//alert(sourceFolder);
// If a valid folder is selected
if ( sourceFolder != null )
{
	files = new Array();
    fileType = '*.svg';
  
	
	// Get all files matching the pattern
    files = sourceFolder.getFiles(fileType);
	
	if ( files.length > 0 )
	{
		// Get the destination to save the files
        destFolder = 'C:/Users/kjoos/Desktop/Art_File_Creator/bin/ConvertedFiles/PDF';
		for ( i = 0; i < files.length; i++ )
		{
			sourceDoc = app.open(files[i]); // returns the document object
			
			AddSpotColor()
									
			// Call function getNewName to get the name and file to save the pdf
			targetFile = getNewName();
			
			// Call function getPDFOptions get the PDFSaveOptions for the files
			pdfSaveOpts = getPDFOptions( );
			
			// Save as pdf
			sourceDoc.saveAs( targetFile, pdfSaveOpts );
			
			sourceDoc.close();
		}
		//alert( 'Files are saved as PDF in ' + destFolder );
	}
	else
	{
		alert( 'No matching files found' );
	}
}




/*********************************************************

getNewName: Function to get the new file name. The primary
name is the same as the source file.

**********************************************************/

function getNewName()
{
	var ext, docName, newName, saveInFile, docName;
	docName = sourceDoc.name;
	ext = '.pdf'; // new extension for pdf file
	newName = "";
		
	for ( var i = 0 ; docName[i] != "." ; i++ )
	{
		newName += docName[i];
	}
	newName += ext; // full pdf name of the file
	
	// Create a file object to save the pdf
	saveInFile = new File( destFolder + '/' + newName );
	

	return saveInFile;
}




/*********************************************************

getPDFOptions: Function to set the PDF saving options of the 
files using the PDFSaveOptions object.

**********************************************************/

function getPDFOptions()
{
	// Create the PDFSaveOptions object to set the PDF options
	var pdfSaveOpts = new PDFSaveOptions();
	
	// Setting PDFSaveOptions properties. Please see the JavaScript Reference
	// for a description of these properties.
	// Add more properties here if you like
	pdfSaveOpts.acrobatLayers = true;
	pdfSaveOpts.colorBars = false;
	pdfSaveOpts.colorCompression = CompressionQuality.AUTOMATICJPEGHIGH;
	pdfSaveOpts.compressArt = true; //default
	pdfSaveOpts.embedICCProfile = true;
	pdfSaveOpts.enablePlainText = true;
	pdfSaveOpts.generateThumbnails = true; // default
	pdfSaveOpts.optimization = true;
	pdfSaveOpts.pageInformation = false;
	
	// uncomment to view the pdfs after conversion.
	// pdfSaveOpts.viewAfterSaving = true;
	

	return pdfSaveOpts;
}

function AddSpotColor()
{
	var spotName = "CutContour";

	var docRef = app.activeDocument;



	// Create CMYKColor
	var rgbColor = new RGBColor();
	rgbColor.red = 236;
	rgbColor.green = 0;
	rgbColor.blue = 140;


	// Create Spot
	var spot = docRef.spots.add();
	spot.color = rgbColor;
	spot.colorType = ColorModel.SPOT;
	spot.name = spotName;




	// Apply the tinted spot swatch to a new path item

	var pathRef = docRef.selectObjectsOnActiveArtboard(); 

	var PMSColor = docRef.swatches.getByName(spotName); 


	docRef.defaultStrokeColor = PMSColor.color
	
	return
}


