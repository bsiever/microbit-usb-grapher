import React, {Component} from 'react';
import {Icon, Button} from 'semantic-ui-react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class SaveDataButton extends Component {
  render () {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
      <Button
        icon
        labelPosition="left"
        onClick={(e)=> exportToCSV(this.props.csvData, this.props.fileName)}
        color="grey"
      >
        <Icon name="save" />
        Save
      </Button>
    );
  }
}

export default SaveDataButton;
