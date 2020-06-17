export const userColumn=(onEdit,onShowData)=>
{
function onUpdate(count)
{
    onEdit(count);
} 
// function onDelete(count)
// {
//    // onRemove(count);
// } 

function onView(count)
{
    onShowData(count);
}

 return (
    [
    { text: 'ID', datafield: 'id', cellsalign: 'center',filtertype: 'input',filterable:false,width:100,exportable :true},
    { text: 'First Name', datafield: 'firstname', cellsalign: 'center',filtertype: 'input',width:160,exportable :true},
    { text: 'Last Name', datafield: 'lastname', cellsalign: 'center',filtertype: 'input',width:170,exportable :true},
    { text: 'Mobile', datafield: 'mobile', cellsalign: 'center',filtertype: 'number',width:140,exportable :true},
    { text: 'Username', datafield: 'username', cellsalign: 'center',filtertype: 'input',width:120,exportable :true},
    { text: 'Is Active', datafield: 'isactive', cellsalign: 'center',width:100, filterable:false,
    exportable :false,
    cellsrenderer: (rownumber,column,value) => {
        return value==1 ? '<div class="jqx-grid-cell-left-align" style="margin-top: 5px;"><span class="btn btn-sm green jqx-data-table-icon text-success" title="Yes">Yes</span>' : '<span class="btn btn-sm bg-grey-gallery jqx-data-no-icon jqx-grid-cell-left-align text-danger" title="No" style="margin-top: 5px;">No</span> </div>';
    }},
    { text: 'Email', datafield: 'email', cellsalign: 'center',filtertype: 'input',width:200,exportable :true},
    {
        cellsrenderer: () => {
            return `Edit`;
        },
        cellclassname:'editButtonClass',
        buttonclick: (rownumber) => {
            console.log('rownumber',rownumber);
            return onUpdate(rownumber);
        },
        columntype: 'button',datafield: 'Edit',text:' ',
        width:40,
        filterable:false,
        columngroup:'action',
        menu:false,
        exportable :false
    },
    {
        cellsrenderer: () => {
            return 'View';
        },
        cellclassname:'viewButtonClass',
        buttonclick: (rownumber) => {
            return onView(rownumber);
        },
        columntype: 'button',
        datafield: 'View',
        filterable:false,
        columngroup:'action',text:' ',
        menu:false
    }
])
};