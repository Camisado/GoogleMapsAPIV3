/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        mapController.initialize();
    }
};

var mapController = {
    MY_LOCATION: {
        lat: 0,
        lng: 0
    },
    initialize: function() {
        var self = this;
        var mapOptions = {
            center: new google.maps.LatLng(this.MY_LOCATION.lat, this.MY_LOCATION.lng),
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            rotateControl: true
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        var myLocButton = document.getElementById("myLoc");
        myLocButton.addEventListener("click", function() {
            self.getMyPosition(map);
        }, false);
    },
    getMyPosition: function(map) {
        var self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
        } else {
            alert("Geolocation not supported!");
        }

        function successPosition(position) {
            console.log(self.MY_LOCATION.lat + ", " + self.MY_LOCATION.lng);
            self.MY_LOCATION.lat = position.coords.latitude;
            self.MY_LOCATION.lng = position.coords.longitude;
            console.log(self.MY_LOCATION.lat + ", " + self.MY_LOCATION.lng);
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            /*var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: "I'm here!"
            });*/

            var marker = new google.maps.Marker({
                position: pos,
                title: "I'm here!"
            });
            marker.setMap(map);
            map.panTo(pos);
        }

        function errorPosition(msg) {
            alert("Fail get position: " + msg);
        }
    }
};