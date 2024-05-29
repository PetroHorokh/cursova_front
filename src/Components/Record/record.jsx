import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
} from '@mui/x-data-grid';
import './record.css';
import * as React from "react";
import {useEffect, useMemo, useRef} from "react";

const Record = (props) => {

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 100,
            editable: true,
        },
        {
            field: 'text',
            headerName: 'Text',
            width: 100,
            editable: true,
        },
        {
            field: 'timestamp',
            headerName: 'Date',
            width: 150,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    // <GridActionsCellItem
                    //     icon={<EditIcon />}
                    //     label="Edit"
                    //     className="textPrimary"
                    //     onClick={handleEditClick(id)}
                    //     color="inherit"
                    // />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const [rows, setRows] = React.useState(props.records);
    const [rowModesModel, setRowModesModel] = React.useState({});

    useEffect(() => {
        setRows(props.records);
    }, [props.records]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (updated, original) => () => {
        console.log(updated)

        // fetch('http://localhost:8080/record/put/' + updated, {
        //     method: 'Put',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         RecordId: updated.recordId,
        //         SectionId: updated.sectionId,
        //         Title: updated.title,
        //         Text: updated.text,
        //         Timestamp: updated.timestamp
        //     }),
        // })
        //     .then(
        //         () => {
        //             props.loadRecords();
        //         },
        //         (error) => {
        //             console.log(error);
        //         }
        //     )
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));

        fetch('http://localhost:8080/record/delete/' + id, {
            method: 'Delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(
                () => {
                    props.loadRecords();
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <Box
            sx={{
                height: 400,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                getRowId={(row) => row.recordId}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

export default Record;