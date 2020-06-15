export const userColumn=(onEdit,onShowData)=>
{
function onUpdate(count)
{
    onEdit(count);
} 
function onDelete(count)
{
   // onRemove(count);
} 

function onView(count)
{
    onShowData(count);
}

 return (
    [
    { text: 'ID', datafield: 'id', cellsalign: 'center',filtertype: 'number',filterable:false},
    { text: 'First Name', datafield: 'firstname', cellsalign: 'center',filtertype: 'input'},
    { text: 'Last Name', datafield: 'lastname', cellsalign: 'center',filtertype: 'input'},
    { text: 'Mobile', datafield: 'mobile', cellsalign: 'center',filtertype: 'input'},
    { text: 'Username', datafield: 'username', cellsalign: 'center',filtertype: 'input'},
    { text: 'Email', datafield: 'email', cellsalign: 'center',filtertype: 'input'},
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
        filterable:false,
        columngroup:'action',
        menu:false
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