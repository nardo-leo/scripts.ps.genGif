function main() {

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

    var doc = app.activeDocument;
    var layers = doc.layers; // get artboards as top layers

    // choose output dir
    var outputDir = Folder.selectDialog("Choose Output Folder", "");

    // TODO choose Gif duration or paste Action here

    // open each file as first layer and save as a gif
    for (var i = 0; i < layers.length; i++) {
        doc.activeLayer = layers[i];
        // TODO go through artboard's (slice's) layers
        // TODO export all user's slices as a gif
        //         // save as a Gif
        //         var name = decodeURI(myDocument.name).replace(/\.[^\.]+$/, '');
        //         var saveFile = new File(outputDir + "/" + name + "-" + (i + 1) + ".gif");
        //         saveForWeb(saveFile);
    }
}

main();
