function doGet(e) {
    var op = e.parameter.action;
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1EGaryscXh5nH55Qgz84PXV9iqBeOKYSzEviwEqZpayM/edit#gid=0");
    var sheet = ss.getSheetByName("sheet2");
  
    if (op == "insert")
      return insert_value(e, sheet);
  
    if (op == "read")
      return read_value(e, ss);
  
    if (op == "update")
      return update_value(e, sheet);
  
    if (op == "delete1")
      return delete_value1(e, sheet);
  
    if (op == "delete")
      return delete_value(e, sheet);
  
    let data = sheet.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(data)
    ).setMimeType(ContentService.MimeType.JSON)
  
  }
  
  function insert_value(request, sheet) {
    let i = sheet.getLastRow() + 1;
  
    sheet.getRange(i, 1).setValue(request.parameter.nu);
    sheet.getRange(i, 2).setValue(request.parameter.date);
    sheet.getRange(i, 3).setValue(request.parameter.item);
    sheet.getRange(i, 4).setValue(request.parameter.note);
    sheet.getRange(i, 5).setValue(request.parameter.user);
    sheet.getRange(i, 6).setValue(request.parameter.del);
  
    var result = "Insertion successful";
    result = JSON.stringify({ "result": result });
  
    return ContentService
      .createTextOutput(request.parameter.callback + "(" + result + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  function update_value(request, sheet) {
    var lr = sheet.getLastRow();
    for (var i = 1; i <= lr; i++) {
      var rnu = sheet.getRange(i, 1).getValue();
      if (rnu == request.parameter.nu) {
        sheet.getRange(i, 2).setValue(request.parameter.date);
        sheet.getRange(i, 3).setValue(request.parameter.item);
        sheet.getRange(i, 4).setValue(request.parameter.note);
        sheet.getRange(i, 5).setValue(request.parameter.user);
        sheet.getRange(i, 6).setValue(request.parameter.del);
  
      }
    }
  
    var result = "value updated successfully";
    result = JSON.stringify({ "result": result });
  
    return ContentService
      .createTextOutput(request.parameter.callback + "(" + result + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  function delete_value(request, sheet) {
    var lr = sheet.getLastRow();
    for (var i = 1; i <= lr; i++) {
      var rnu = sheet.getRange(i, 1).getValue();
      if (rnu == request.parameter.nu) {
        sheet.getRange(i, 5).setValue(request.parameter.user);
        sheet.getRange(i, 6).setValue(request.parameter.del);
      }
    }
  
    var result = "value updated successfully";
    result = JSON.stringify({ "result": result });
  
    return ContentService
      .createTextOutput(request.parameter.callback + "(" + result + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  function delete_value1(request, sheet) {
    var id = request.parameter.id;
    var flag = 0;
  
    var lr = sheet.getLastRow();
    for (var i = 1; i <= lr; i++) {
      var rid = sheet.getRange(i, 1).getValue();
      if (rid == id) {
        sheet.deleteRows(i);
        var result = "value deleted successfully";
        flag = 1;
      }
    }
    if (flag == 0)
      var result = "id not found";
  
    result = JSON.stringify({
      "result": result
    });
  
    return ContentService
      .createTextOutput(request.parameter.callback + "(" + result + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  function read_value(request, ss) {
    var output = ContentService.createTextOutput(),
      data = {};
    var sheet = "sheet1";
    data.records = readData_(ss, sheet);
    var callback = request.parameters.callback;
    if (callback === undefined) {
      output.setContent(JSON.stringify(data));
    } else {
      output.setContent(callback + "(" + JSON.stringify(data) + ")");
    }
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);
    return output;
  }
  
  function readData_(ss, sheetname, properties) {
    if (typeof properties == "undefined") {
      properties = getHeaderRow_(ss, sheetname);
      properties = properties.map(function (p) { return p.replace(/\s+/g, '_'); });
    }
  
    var rows = getDataRows_(ss, sheetname),
      data = [];
  
    for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r],
        record = {};
      for (var p in properties) {
        record[properties[p]] = row[p];
      }
      data.push(record);
    }
    return data;
  }
  
  function getDataRows_(ss, sheetname) {
    var sh = ss.getSheetByName(sheetname);
    return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  }
  
  function getHeaderRow_(ss, sheetname) {
    var sh = ss.getSheetByName(sheetname);
    return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  }