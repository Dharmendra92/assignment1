import { Meteor } from 'meteor/meteor';
import { hasPermission } from 'meteor/rocketchat:authorization';
import { Statistics } from 'meteor/rocketchat:models';
import { statistics } from '../../lib/rocketchat';

Meteor.methods({
	getStatistics(refresh) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'getStatistics' });
		}

		if (hasPermission(Meteor.userId(), 'view-statistics') !== true) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'getStatistics' });
		}

		if (refresh) {
			return statistics.save();
		} else {
			return Statistics.findLast();
		}
	},
});
