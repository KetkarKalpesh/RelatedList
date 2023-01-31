import { LightningElement, track, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class RelatedList extends LightningElement {
  @api recordId;
  @track records;
  @track error;
    @track columns=[
        {label:'Id', fieldName:'Id'},
        {label:'Person Name', fieldName:'Name'},
        {label:'Deals Accepted',  fieldName:'Deals_Accepted__c'},
    ];


    @wire(getRelatedListRecords, {
      parentRecordId: '$recordId',
      relatedListId: 'Contacts',
      fields: ['Contact.Id','Contact.Name','Contact.Deals_Accepted__c']
      })listInfo({ error, data }) {
          if (data) {

              console.log("data ",data.records);
              let processedRecords = [];

            data.records.forEach( obj => {

                console.log( 'obj is', JSON.stringify( obj ) );
                let rec = {};
                rec.Id = obj.fields.Id.value;
                rec.Name = obj.fields.Name.value;
                rec.Deals_Accepted__c = obj.fields.Deals_Accepted__c.value;
                processedRecords.push( rec );

            } );
            this.records = processedRecords;
              this.error = undefined;
          } else if (error) {
              this.error = error;
              this.records = undefined;
          }
      }
}