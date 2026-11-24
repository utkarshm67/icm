import assert from 'node:assert/strict';
import test from 'node:test';
import { isOverdue } from '../client/src/models/incident.js';

const now = Date.parse('2026-11-24T05:00:00Z');

test('active incidents become overdue at exactly 24 hours without an update', () => {
  for (const status of ['New', 'InProgress', 'OnHold']) {
    assert.equal(isOverdue({ status, updatedAt: '2026-11-23T05:00:00.001Z' }, now), false);
    assert.equal(isOverdue({ status, updatedAt: '2026-11-23T05:00:00Z' }, now), true);
    assert.equal(isOverdue({ status, updatedAt: '2026-11-22T05:00:00Z' }, now), true);
  }
});

test('resolved and closed incidents never become overdue', () => {
  for (const status of ['Resolved', 'Closed']) {
    assert.equal(isOverdue({ status, updatedAt: '2020-01-01T00:00:00Z' }, now), false);
  }
});

test('a fresh update clears overdue status and future timestamps are not overdue', () => {
  assert.equal(isOverdue({ status: 'InProgress', updatedAt: '2026-11-24T05:00:00Z' }, now), false);
  assert.equal(isOverdue({ status: 'New', updatedAt: '2026-11-25T05:00:00Z' }, now), false);
});

test('overdue detection compares elapsed time across timezone offsets', () => {
  assert.equal(isOverdue({ status: 'New', updatedAt: '2026-11-23T10:30:00+05:30' }, now), true);
  assert.equal(isOverdue({ status: 'New', updatedAt: '2026-11-23T10:30:01+05:30' }, now), false);
});
