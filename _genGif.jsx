function main() {
    // choose dirs
    var srcDir = Folder.selectDialog("Choose Source Folder", "");
    var outputDir = Folder.selectDialog("Choose Output Folder", "");

    var myDocument = app.activeDocument;
    var smartLayer = myDocument.activeLayer;

    // get all files in srcDir
    var fileList = srcDir.getFiles();

    // replace smartLayer content
    function replaceContents(newFile, sLayer) {
        app.activeDocument.activeLayer = sLayer;
        var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        desc3.putPath(idnull, new File(newFile));
        var idPgNm = charIDToTypeID("PgNm");
        desc3.putInteger(idPgNm, 1);
        executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
        return app.activeDocument.activeLayer
    };

    // save for web
    function saveForWeb(saveFile) {
        var sfwOptions = new ExportOptionsSaveForWeb();
        sfwOptions.format = SaveDocumentType.COMPUSERVEGIF;
        sfwOptions.includeProfile = false;
        sfwOptions.interlaced = 1;
        sfwOptions.optimized = true;
        sfwOptions.transparency = 1;
        sfwOptions.ColorReductionType = ColorReductionType.SELECTIVE;
        sfwOptions.dither = Dither.NONE;
        sfwOptions.ditherAmount = 80;
        sfwOptions.quality = 0;
        sfwOptions.webSnap = 0;
        sfwOptions.colors = 128;
        activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
    }

    // open each file as first layer and save as a gif
    for (var i = 0; i < fileList.length; i++){

        // open only files
        if (fileList[i] instanceof File) {

            // check if layer is SmartObject
            if (smartLayer.kind == "LayerKind.SMARTOBJECT") {

                // change Smartobject layer to fileList[i]
                smartLayer = replaceContents(fileList[i], smartLayer);

                // save as a Gif
                var name = decodeURI(myDocument.name).replace(/\.[^\.]+$/, '');
                var saveFile = new File(outputDir + "/" + name + "-" + (i + 1) + ".gif");
                saveForWeb(saveFile);
            } else {
                alert("Selected Layer is not a smart object");
                return;
            }
        }
    }
}

main();
