CREATE TABLE IF NOT EXISTS tasks(
    task_id UUID PRIMARY KEY NOT NULL,
    content varchar,
    complete boolean
);

INSERT INTO tasks
    (task_id, content, complete)
VALUES
    ('41e24ab6-15ce-485b-a232-c200214135d4', 'Seed database system', true),
    ('99124357-2b9f-4c7c-a495-1f6a72077bbd', 'With multiple values!', true),
    ('16b64a1a-34da-4fbd-829d-57a90cbef459', 'And see what happens', false);