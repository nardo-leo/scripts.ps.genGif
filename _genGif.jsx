var doc = app.activeDocument;
var outputDir = Folder.selectDialog('Choose Output Folder', '');


function chooseDuration() {
    var dlg = new Window('dialog', 'Frame duration');
    dlg.panel = dlg.add('panel', undefined, 'in seconds');
    dlg.panel.alignChildren = 'fill';
    var durationField = dlg.panel.add('edittext', undefined, '1');
    var btnOk = dlg.add('button', undefined, 'OK');
    dlg.show();
    return duration = durationField.text;
}


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


function ExecuteOnAllSets(item) {
    ExecuteOnAllLayersInSet(item, Action);
    var i = 0;
    while (i < item.layerSets.length) {
        ExecuteOnAllSets(item.layerSets[i]);
        i++;
    }
}


function ExecuteOnAllLayersInSet(set, f) {
    var i = 0;
    while (i < set.artLayers.length) {
        SelectLayer(set.artLayers[i]);
        f();
        i++;
    }
}


function Action() {
    ChangeLayerTLLength(-90, 0);
    ChangeLayerTLLength(duration, 0);
}


function ChangeLayerTLLength(seconds, frames) {
    var idmoveOutTime = stringIDToTypeID( 'moveOutTime' );
        var desc8 = new ActionDescriptor();
        var idtimeOffset = stringIDToTypeID( 'timeOffset' );
            var desc9 = new ActionDescriptor();
            var idseconds = stringIDToTypeID( 'seconds' );
            desc9.putInteger( idseconds, seconds );
            var idframe = stringIDToTypeID( 'frame' );
            desc9.putInteger( idframe, frames );
            var idframeRate = stringIDToTypeID( 'frameRate' );
            desc9.putDouble( idframeRate, 30.000000 );
        var idtimecode = stringIDToTypeID( 'timecode' );
        desc8.putObject( idtimeOffset, idtimecode, desc9 );
    executeAction( idmoveOutTime, desc8, DialogModes.NO );
}


function SelectLayer(layer) {
    doc.activeLayer = layer;
}


(function main() {
    chooseDuration();
    ExecuteOnAllSets(doc);
})();


// open each file as first layer and save as a gif
// for (var i = 0; i < layers.length; i++) {
//     doc.activeLayer = layers[i];
    // TODO go through artboard's (slice's) layers and move them
    // TODO export all user's slices as a gif
    //         // save as a Gif
    //         var name = decodeURI(myDocument.name).replace(/\.[^\.]+$/, '');
    //         var saveFile = new File(outputDir + '/' + name + '-' + (i + 1) + '.gif');
    //         saveForWeb(saveFile);
//     }
